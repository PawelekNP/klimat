"""Dodatek Klimat — harmonogram i reguły ogrzewania/chłodzenia.

Jedno miejsce decyduje, jaka temperatura ma być teraz w danym pokoju:

    harmonogram  →  reguły (mogą go nadpisać)  →  komenda do urządzenia

Dzięki temu nie ma dwóch automatyzacji walczących o ten sam grzejnik.
"""

from __future__ import annotations

import logging
from datetime import timedelta
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_time_interval, async_track_state_change_event
from homeassistant.helpers.storage import Store
from homeassistant.components import websocket_api
from homeassistant.util import dt as dt_util

from .card import async_setup_card
from .const import (
    DOMAIN, STORAGE_KEY, STORAGE_VERSION, DEFAULT_DATA, TICK_SECONDS,
    TURBO_MAX_MIN, VERSION,
)

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


class KlimatData:
    """Harmonogram, reguły i silnik, który je wykonuje."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.data: dict[str, Any] = _with_defaults({})
        self._unsub_timer = None
        self._unsub_states = None
        # co ostatnio wysłaliśmy do pokoju i w którym bloku harmonogramu —
        # po tym poznajemy, że ktoś zmienił temperaturę ręcznie
        self._applied: dict[str, dict[str, Any]] = {}
        # dlaczego pokój ma akurat taką temperaturę — karta to pokazuje
        self.reasons: dict[str, str] = {}
        # o której harmonogram przejmie z powrotem stery
        self._next_change: dict[str, float | None] = {}
        # blok, w którym zastaliśmy urządzenie wyłączone ręcznie —
        # wyłączenie obowiązuje do końca tego bloku, potem harmonogram wraca
        self._off_block: dict[str, str] = {}
        # pokoje w trybie turbo: {nazwa: {"temp": float, "started": datetime}}
        self._turbo: dict[str, dict[str, Any]] = {}

    # ---------- zapis i odczyt ----------

    async def async_load(self) -> None:
        stored = await self._store.async_load()
        if stored:
            self.data = _with_defaults(stored)

    async def async_save(self, data: dict[str, Any]) -> None:
        self.data = _with_defaults(data or {})
        await self._store.async_save(self.data)
        self._applied.clear()
        self._resubscribe()
        await self.async_apply()

    # ---------- cykl życia ----------

    def start(self) -> None:
        self._unsub_timer = async_track_time_interval(
            self.hass, self._tick, timedelta(seconds=TICK_SECONDS)
        )
        self._resubscribe()

    def stop(self) -> None:
        if self._unsub_timer:
            self._unsub_timer()
            self._unsub_timer = None
        if self._unsub_states:
            self._unsub_states()
            self._unsub_states = None

    def _watched_entities(self) -> list[str]:
        """Encje, których zmiana ma natychmiast przeliczyć temperatury."""
        out: list[str] = []
        if self.data.get("season_entity"):
            out.append(self.data["season_entity"])
        for room in self.data.get("rooms", []):
            if room.get("window"):
                out.append(room["window"])
        out.extend(self.data.get("rules", {}).get("away", {}).get("persons", []) or [])
        return list({e for e in out if e})

    def _resubscribe(self) -> None:
        if self._unsub_states:
            self._unsub_states()
            self._unsub_states = None
        watched = self._watched_entities()
        if watched:
            self._unsub_states = async_track_state_change_event(
                self.hass, watched, self._on_state_event
            )

    async def _tick(self, _now) -> None:
        await self.async_apply()

    @callback
    def _on_state_event(self, _event) -> None:
        self.hass.async_create_task(self.async_apply())

    # ---------- odczyt stanu świata ----------

    def _is_summer(self) -> bool:
        ent = self.data.get("season_entity")
        if not ent:
            return False
        state = self.hass.states.get(ent)
        return bool(state and state.state == "on")

    def _nobody_home(self) -> bool:
        rule = self.data.get("rules", {}).get("away", {})
        persons = rule.get("persons") or []
        if not persons:
            return False
        for ent in persons:
            state = self.hass.states.get(ent)
            if state is None:
                continue
            if state.state == "home":
                return False
        return True

    def _window_open(self, room: dict) -> bool:
        rule = self.data.get("rules", {}).get("window_open", {})
        ent = room.get("window")
        if not ent:
            return False
        state = self.hass.states.get(ent)
        if state is None or state.state != "on":
            return False
        delay = float(rule.get("delay_min", 2) or 0)
        if delay <= 0:
            return True
        open_for = (dt_util.utcnow() - state.last_changed).total_seconds() / 60
        return open_for >= delay

    # ---------- harmonogram ----------

    def _level_temp(self, key: str) -> float | None:
        for lvl in self.data.get("levels") or []:
            if lvl.get("key") == key:
                try:
                    return float(lvl.get("t"))
                except (TypeError, ValueError):
                    return None
        return None

    @staticmethod
    def _next_boundary(day_blocks: list[dict], hour_float: float) -> float:
        """Godzina, o której zacznie obowiązywać kolejny blok (24 = północ)."""
        for b in sorted(day_blocks or [], key=lambda x: float(x.get("h", 0))):
            h = float(b.get("h", 0))
            if h > hour_float:
                return h
        return 24.0

    def _block_at(self, day_blocks: list[dict], hour_float: float) -> tuple[float | None, float | None]:
        """Zwraca (temperatura, godzina startu bloku) obowiązujące o danej porze.

        Blok może wskazywać poziom (Komfort, Eko, Noc…) zamiast konkretnej liczby —
        wtedy temperatura bierze się z definicji poziomu, więc zmiana poziomu
        przestawia wszystkie bloki, które się na niego powołują.
        """
        if not day_blocks:
            return None, None
        blocks = sorted(day_blocks, key=lambda b: float(b.get("h", 0)))
        current = None
        for b in blocks:
            if float(b.get("h", 0)) <= hour_float:
                current = b
            else:
                break
        if current is None:
            # przed pierwszym blokiem obowiązuje ostatni blok z poprzedniej doby
            current = blocks[-1]

        temp = None
        if current.get("lvl"):
            temp = self._level_temp(current["lvl"])
        if temp is None:
            try:
                temp = float(current.get("t"))
            except (TypeError, ValueError):
                return None, None
        try:
            return temp, float(current.get("h", 0))
        except (TypeError, ValueError):
            return None, None

    def target_entity(self, room: dict) -> str | None:
        heat, cool = room.get("heat"), room.get("cool")
        if self._is_summer():
            return cool or heat
        return heat or cool

    def room_temp(self, room: dict) -> float | None:
        """Zmierzona temperatura pokoju — ze ściennego czujnika, nie z głowicy."""
        ent = room.get("sensor")
        if ent:
            state = self.hass.states.get(ent)
            if state is not None:
                try:
                    return float(state.state)
                except (TypeError, ValueError):
                    pass
        for ent in (room.get("heat"), room.get("cool")):
            if not ent:
                continue
            state = self.hass.states.get(ent)
            if state is None:
                continue
            try:
                return float(state.attributes.get("current_temperature"))
            except (TypeError, ValueError):
                continue
        return None

    def can_turbo(self, room: dict) -> bool:
        """Turbo wymaga grzejnika i klimatyzacji, która umie grzać."""
        if not room.get("heat") or not room.get("cool"):
            return False
        state = self.hass.states.get(room["cool"])
        return bool(state and "heat" in (state.attributes.get("hvac_modes") or []))

    def wake_mode(self, room: dict, state) -> str | None:
        """Tryb, w który wprowadzamy urządzenie, gdy harmonogram je budzi."""
        modes = list(state.attributes.get("hvac_modes") or [])
        if not modes:
            return None
        cooling = room.get("cool") and self.target_entity(room) == room.get("cool")
        wanted = ["cool", "auto", "heat_cool"] if cooling else ["heat", "auto", "heat_cool"]
        for mode in wanted:
            if mode in modes:
                return mode
        for mode in modes:
            if mode != "off":
                return mode
        return None

    def other_entity(self, room: dict) -> str | None:
        """Urządzenie, które w tej porze roku ma milczeć."""
        heat, cool = room.get("heat"), room.get("cool")
        target = self.target_entity(room)
        for ent in (heat, cool):
            if ent and ent != target:
                return ent
        return None

    # ---------- wykonanie ----------

    def desired_for_room(self, room: dict) -> tuple[float | None, str, str]:
        """Docelowa temperatura, powód i identyfikator bieżącego bloku."""
        rules = self.data.get("rules", {})

        days = room.get("days") or []
        base = None
        block_key = "brak"
        if len(days) == 7:
            now = dt_util.now()
            base, block_h = self._block_at(
                days[now.weekday()], now.hour + now.minute / 60
            )
            if block_h is not None:
                block_key = f"{now.weekday()}:{block_h}"

        reason = "schedule"
        temp = base
        self._next_change[room.get("name") or "?"] = (
            self._next_boundary(days[dt_util.now().weekday()], dt_util.now().hour + dt_util.now().minute / 60)
            if len(days) == 7 else None
        )

        away = rules.get("away", {})
        if away.get("enabled") and self._nobody_home():
            t = float(away.get("temp", 17))
            if temp is None or t < temp:
                temp, reason = t, "away"

        win = rules.get("window_open", {})
        if win.get("enabled") and self._window_open(room):
            t = float(win.get("temp", 16))
            if temp is None or t < temp:
                temp, reason = t, "window"

        return temp, reason, block_key

    # ---------- turbo ----------

    async def async_start_turbo(self, name: str, temp: float) -> None:
        """Grzejnik i klimatyzacja grzeją razem, aż pokój osiągnie temperaturę."""
        self._turbo[name] = {"temp": float(temp), "started": dt_util.utcnow()}
        self._applied.pop(name, None)
        self._off_block.pop(name, None)
        await self.async_apply()

    async def async_stop_turbo(self, name: str) -> None:
        room = next(
            (r for r in self.data.get("rooms", []) if (r.get("name") or "?") == name), None
        )
        await self._stop_turbo(name, (room or {}).get("cool"))
        await self.async_apply()

    async def _stop_turbo(self, name: str, cool: str | None) -> None:
        """Gasimy klimatyzację i oddajemy pokój harmonogramowi."""
        self._turbo.pop(name, None)
        self._applied.pop(name, None)
        self._off_block.pop(name, None)
        if not cool:
            return
        state = self.hass.states.get(cool)
        if state is not None and state.state not in ("off", "unavailable", "unknown"):
            _LOGGER.debug("Klimat: turbo w %s zakończone, gaszę %s", name, cool)
            await self.hass.services.async_call(
                "climate", "set_hvac_mode",
                {"entity_id": cool, "hvac_mode": "off"},
                blocking=False,
            )

    async def _run_turbo(self, room: dict, name: str) -> bool:
        """True, jeśli turbo dalej trwa i pokój został obsłużony."""
        info = self._turbo.get(name) or {}
        heat, cool = room.get("heat"), room.get("cool")
        try:
            goal = float(info.get("temp"))
        except (TypeError, ValueError):
            goal = None

        started = info.get("started")
        minutes = (dt_util.utcnow() - started).total_seconds() / 60 if started else 0
        measured = self.room_temp(room)

        # cel osiągnięty albo bezpiecznik czasowy — koniec zabawy
        if goal is None or not cool:
            await self._stop_turbo(name, cool)
            return False
        if measured is not None and measured >= goal - 0.1:
            _LOGGER.debug("Klimat: turbo w %s — osiągnięto %.1f°C", name, measured)
            await self._stop_turbo(name, cool)
            return False
        if minutes >= TURBO_MAX_MIN:
            _LOGGER.warning(
                "Klimat: turbo w %s przerwane po %d min — cel %.1f°C nieosiągnięty",
                name, TURBO_MAX_MIN, goal,
            )
            await self._stop_turbo(name, cool)
            return False

        # grzejnik: ta sama temperatura; zawór i tak otworzy się do oporu,
        # a po turbo nie zostaje rozkręcony na maksa
        if heat:
            state = self.hass.states.get(heat)
            if state is not None and state.state not in ("unavailable", "unknown"):
                if state.state == "off":
                    mode = self.wake_mode({"heat": heat}, state)
                    if mode:
                        await self.hass.services.async_call(
                            "climate", "set_hvac_mode",
                            {"entity_id": heat, "hvac_mode": mode}, blocking=False,
                        )
                await self._set_temp_if_needed(heat, state, goal)

        # klimatyzacja w trybie grzania
        state = self.hass.states.get(cool)
        if state is not None and state.state not in ("unavailable", "unknown"):
            if state.state != "heat":
                await self.hass.services.async_call(
                    "climate", "set_hvac_mode",
                    {"entity_id": cool, "hvac_mode": "heat"}, blocking=False,
                )
            await self._set_temp_if_needed(cool, state, goal)

        self.reasons[name] = f"turbo:{goal:.1f}"
        self._applied.pop(name, None)
        return True

    async def _set_temp_if_needed(self, entity: str, state, temp: float) -> None:
        current = state.attributes.get("temperature")
        if current is not None and abs(float(current) - temp) < 0.05:
            return
        await self.hass.services.async_call(
            "climate", "set_temperature",
            {"entity_id": entity, "temperature": temp}, blocking=False,
        )

    def _until_label(self, name: str, prefix: str) -> str:
        """Do kiedy obowiązuje ręczne ustawienie — karta pokazuje to na kafelku."""
        until = self._next_change.get(name)
        if until is not None and until < 24:
            h, m = int(until), int(round((until - int(until)) * 60))
            if m == 60:
                h, m = h + 1, 0
            if h < 24:
                return f"{prefix}:{h:02d}:{m:02d}"
        return f"{prefix}:midnight"

    async def async_resume(self, name: str) -> None:
        """Anuluje ręczne nadpisanie w pokoju i oddaje stery harmonogramowi."""
        self._applied.pop(name, None)
        self._off_block.pop(name, None)
        if name in self._turbo:
            room = next(
                (r for r in self.data.get("rooms", []) if (r.get("name") or "?") == name), None
            )
            await self._stop_turbo(name, (room or {}).get("cool"))
        await self.async_apply()

    async def async_apply(self) -> None:
        if not self.data.get("enabled", True):
            return

        no_conflict = self.data.get("rules", {}).get("no_conflict", {}).get("enabled", True)

        for room in self.data.get("rooms", []):
            name = room.get("name") or "?"
            target = self.target_entity(room)
            if not target:
                continue

            # Turbo — jedyny moment, w którym grzejnik i klimatyzacja pracują razem.
            if name in self._turbo and await self._run_turbo(room, name):
                continue

            # jedno urządzenie na pokój — drugie gasimy, żeby nie walczyły
            if no_conflict:
                other = self.other_entity(room)
                if other:
                    o_state = self.hass.states.get(other)
                    if o_state and o_state.state not in ("off", "unavailable", "unknown"):
                        _LOGGER.debug("Klimat: wyłączam %s (konflikt w %s)", other, name)
                        await self.hass.services.async_call(
                            "climate", "set_hvac_mode",
                            {"entity_id": other, "hvac_mode": "off"},
                            blocking=False,
                        )

            temp, reason, block_key = self.desired_for_room(room)
            if temp is None:
                continue

            state = self.hass.states.get(target)
            if state is None or state.state in ("unavailable", "unknown"):
                continue
            # Ręczne wyłączenie obowiązuje do końca bieżącego bloku — tak samo
            # jak ręczna zmiana temperatury. Potem harmonogram budzi urządzenie,
            # żeby zgaszony w lipcu grzejnik nie został zgaszony do listopada.
            if state.state == "off":
                wake = self.data.get("rules", {}).get("wake_devices", {}).get("enabled", True)
                off_since = self._off_block.setdefault(name, block_key)

                # reguły tylko oszczędzają — nigdy nie włączają niczego same
                if not wake or reason != "schedule":
                    self.reasons[name] = "off_manual"
                    continue

                if off_since == block_key:
                    self.reasons[name] = self._until_label(name, "off")
                    continue

                mode = self.wake_mode(room, state)
                if mode is None:
                    self.reasons[name] = "off_manual"
                    continue

                _LOGGER.debug("Klimat: budzę %s (%s) w trybie %s", name, target, mode)
                self._off_block.pop(name, None)
                self._applied.pop(name, None)
                await self.hass.services.async_call(
                    "climate", "set_hvac_mode",
                    {"entity_id": target, "hvac_mode": mode},
                    blocking=False,
                )
            else:
                self._off_block.pop(name, None)

            current = state.attributes.get("temperature")
            prev = self._applied.get(name) or {}
            new_block = prev.get("block") != block_key

            # Ręczna zmiana wygrywa z harmonogramem aż do następnego bloku.
            # Reguły (otwarte okno, nikogo w domu) mają pierwszeństwo zawsze.
            if (
                not new_block
                and reason == "schedule"
                and prev.get("sent") is not None
                and current is not None
                and abs(float(current) - float(prev["sent"])) > 0.05
            ):
                # powody zwracamy jako klucze — tłumaczy je karta, zgodnie
                # z językiem ustawionym w Home Assistancie
                self.reasons[name] = self._until_label(name, "manual")
                continue

            self.reasons[name] = reason

            if current is not None and abs(float(current) - temp) < 0.05:
                self._applied[name] = {"block": block_key, "sent": temp}
                continue

            _LOGGER.debug("Klimat: %s (%s) -> %.1f°C [%s]", name, target, temp, reason)
            self._applied[name] = {"block": block_key, "sent": temp}
            await self.hass.services.async_call(
                "climate", "set_temperature",
                {"entity_id": target, "temperature": temp},
                blocking=False,
            )


def _with_defaults(data: dict[str, Any]) -> dict[str, Any]:
    out = {
        "enabled": True,
        "season_entity": None,
        "levels": None,
        "rooms": [],
        "rules": {},
    }
    out.update(data or {})
    if not out.get("levels"):
        out["levels"] = [dict(l) for l in DEFAULT_DATA["levels"]]
    rules = dict(DEFAULT_DATA["rules"])
    for key, default in rules.items():
        merged = dict(default)
        merged.update((out.get("rules") or {}).get(key, {}))
        rules[key] = merged
    out["rules"] = rules
    return out


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await async_setup_card(hass, VERSION)

    data = KlimatData(hass)
    await data.async_load()
    data.start()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["data"] = data

    if not hass.data[DOMAIN].get("ws_registered"):
        websocket_api.async_register_command(hass, ws_get_config)
        websocket_api.async_register_command(hass, ws_set_config)
        websocket_api.async_register_command(hass, ws_apply_now)
        websocket_api.async_register_command(hass, ws_resume_room)
        websocket_api.async_register_command(hass, ws_turbo_start)
        websocket_api.async_register_command(hass, ws_turbo_stop)
        hass.data[DOMAIN]["ws_registered"] = True

    await data.async_apply()
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    store: KlimatData | None = hass.data.get(DOMAIN, {}).get("data")
    if store:
        store.stop()
    return True


# ---------- WebSocket API ----------


def _store(hass: HomeAssistant) -> KlimatData | None:
    return hass.data.get(DOMAIN, {}).get("data")


@callback
@websocket_api.websocket_command({vol.Required("type"): "klimat/config/get"})
def ws_get_config(hass: HomeAssistant, connection, msg) -> None:
    store = _store(hass)
    if store is None:
        connection.send_result(msg["id"], _with_defaults({}))
        return
    result = dict(store.data)
    result["reasons"] = store.reasons
    result["turbo"] = {k: v.get("temp") for k, v in store._turbo.items()}
    result["can_turbo"] = [
        (r.get("name") or "?") for r in store.data.get("rooms", []) if store.can_turbo(r)
    ]
    connection.send_result(msg["id"], result)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): "klimat/config/set", vol.Required("config"): dict}
)
@websocket_api.async_response
async def ws_set_config(hass: HomeAssistant, connection, msg) -> None:
    store = _store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Dodatek Klimat nie jest uruchomiony.")
        return
    cfg = dict(msg["config"])
    cfg.pop("reasons", None)
    await store.async_save(cfg)
    connection.send_result(msg["id"], store.data)


@websocket_api.websocket_command(
    {vol.Required("type"): "klimat/room/resume", vol.Required("room"): str}
)
@websocket_api.async_response
async def ws_resume_room(hass: HomeAssistant, connection, msg) -> None:
    """Pokój wraca pod harmonogram, nie czekając na kolejny blok."""
    store = _store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Dodatek Klimat nie jest uruchomiony.")
        return
    await store.async_resume(msg["room"])
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "klimat/room/turbo",
        vol.Required("room"): str,
        vol.Required("temp"): vol.Coerce(float),
    }
)
@websocket_api.async_response
async def ws_turbo_start(hass: HomeAssistant, connection, msg) -> None:
    """Grzejnik i klimatyzacja grzeją razem do zadanej temperatury."""
    store = _store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Dodatek Klimat nie jest uruchomiony.")
        return
    await store.async_start_turbo(msg["room"], msg["temp"])
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {vol.Required("type"): "klimat/room/turbo/stop", vol.Required("room"): str}
)
@websocket_api.async_response
async def ws_turbo_stop(hass: HomeAssistant, connection, msg) -> None:
    store = _store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Dodatek Klimat nie jest uruchomiony.")
        return
    await store.async_stop_turbo(msg["room"])
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command({vol.Required("type"): "klimat/apply"})
@websocket_api.async_response
async def ws_apply_now(hass: HomeAssistant, connection, msg) -> None:
    store = _store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Dodatek Klimat nie jest uruchomiony.")
        return
    await store.async_apply()
    connection.send_result(msg["id"], {"ok": True})
