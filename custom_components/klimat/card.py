"""Udostępnienie karty Lovelace razem z integracją.

Dzięki temu użytkownik instaluje jedną rzecz i nie musi niczego kopiować do
folderu www ani ręcznie dodawać zasobu w ustawieniach dashboardu.
"""

from __future__ import annotations

import logging
import os

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

CARD_FILENAME = "klimat-card.js"
CARD_URL_BASE = "/klimat_static/klimat-card.js"


async def async_setup_card(hass: HomeAssistant, version: str) -> None:
    """Serwuje plik karty i dopisuje go do zasobów dashboardu."""
    www_dir = os.path.join(os.path.dirname(__file__), "www")
    if not os.path.isfile(os.path.join(www_dir, CARD_FILENAME)):
        _LOGGER.warning("Klimat: brak pliku karty w %s", www_dir)
        return

    await _register_static_path(hass, www_dir)
    await _register_resource(hass, f"{CARD_URL_BASE}?v={version}")


async def _register_static_path(hass: HomeAssistant, www_dir: str) -> None:
    try:
        from homeassistant.components.http import StaticPathConfig

        await hass.http.async_register_static_paths(
            [StaticPathConfig("/klimat_static", www_dir, False)]
        )
    except ImportError:
        # starsze wydania Home Assistanta
        hass.http.register_static_path("/klimat_static", www_dir, False)
    except RuntimeError:
        # ścieżka już zarejestrowana (np. po przeładowaniu integracji)
        pass


def _resources(hass: HomeAssistant):
    """Zasoby dashboardu — kształt tego obiektu zmieniał się między wydaniami HA."""
    data = hass.data.get("lovelace")
    if data is None:
        return None
    res = getattr(data, "resources", None)
    if res is None and isinstance(data, dict):
        res = data.get("resources")
    return res


async def _register_resource(hass: HomeAssistant, url: str) -> None:
    resources = _resources(hass)
    if resources is None:
        _LOGGER.warning(
            "Klimat: nie udało się sięgnąć do zasobów dashboardu. "
            "Dodaj ręcznie zasób %s jako moduł JavaScript.", url
        )
        return

    try:
        if not getattr(resources, "loaded", True):
            await resources.async_load()
            resources.loaded = True

        base = url.split("?")[0]
        for item in resources.async_items():
            if item.get("url", "").split("?")[0] != base:
                continue
            if item["url"] == url:
                return  # już wpisany, w tej samej wersji
            await resources.async_update_item(item["id"], {"url": url})
            _LOGGER.info("Klimat: zaktualizowano zasób karty do %s", url)
            return

        await resources.async_create_item({"res_type": "module", "url": url})
        _LOGGER.info("Klimat: dodano zasób karty %s", url)

    except Exception as err:  # dashboard w trybie YAML albo inna niespodzianka
        _LOGGER.warning(
            "Klimat: nie udało się dodać zasobu karty automatycznie (%s). "
            "Dodaj ręcznie %s jako moduł JavaScript.", err, url
        )
