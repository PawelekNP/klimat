/*!
 * Klimat Card — ogrzewanie i chłodzenie w Home Assistancie.
 * Klimat Card — heating and cooling for Home Assistant.
 * v1.3.0 — MIT
 */

const VERSION = "1.3.0";

/* ================= tłumaczenia / translations ================= */

const STR = {
  pl: {
    outside: "na zewnątrz", winter: "Zima", summer: "Lato",
    tabRooms: "Pokoje", tabSched: "Harmonogram", tabRules: "Reguły", tabHist: "Historia",
    tabEnergy: "Zużycie",
    enThisMonth: "ten miesiąc", enLastMonth: "poprzedni", enYear: "ostatnie 12 miesięcy",
    enTotal: "Razem", enNone: "Żaden pokój nie ma wskazanego licznika energii — " +
      "dodaj go w edytorze karty, w polu „Licznik energii”.",
    enHint: "Liczby pochodzą ze statystyk Home Assistanta, tych samych, które widzisz " +
      "w panelu Energia. Klimat ich nie przelicza, tylko pokazuje w rozbiciu na pokoje.",
    enErr: "Nie udało się wczytać statystyk.",
    edEnergy: "Licznik energii (kWh)",
    edEnergyHint: "Licznik zużycia z gniazdka albo przekaźnika, np. Shelly. " +
      "Musi być licznikiem narastającym, nie chwilową mocą w watach.",
    edPrice: "Cena za kWh", edPriceHint: "Zostaw puste, żeby nie pokazywać kosztów.",
    stHeat: "grzanie", stCool: "chłodzenie", stIdle: "gotowe", stNone: "brak",
    doHeat: "grzeje", doCool: "chłodzi", doHold: "utrzymuje", doNone: "niedostępne",
    target: "cel", room: "Pokój", newRoom: "Nowy pokój",
    down: "Obniż temperaturę", up: "Podnieś temperaturę",
    heating: "Ogrzewanie", ac: "Klimatyzacja", sensor: "Czujnik", window: "Okno",
    on: "wł", off: "off", missing: "brak", waiting: "czeka",
    opened: "otwarte", closed: "zamknięte",
    winJust: "Okno otwarte przed chwilą", winFor: "Okno otwarte od {m} min",
    winHeld: "grzanie wstrzymane", winSoon: "grzanie wstrzymam za {m} min",
    winDevOff: "grzanie i tak wyłączone", winRuleOff: "reguła otwartego okna jest wyłączona",
    winStillOn: "grzanie jeszcze działa",
    resume: "Wróć do harmonogramu",
    rManual: "ręcznie do {t}", rMidnight: "ręcznie do północy",
    rWindow: "otwarte okno", rAway: "nikogo w domu", rOff: "wyłączone ręcznie",
    rOffUntil: "wyłączone do {t}", rOffMidnight: "wyłączone do północy",
    rTurbo: "turbo do {t}°",
    rPreheat: "rozgrzewa na {t}", rNoSensor: "brak czujnika",
    floor: "Podłogówka",
    lockOn: "Blokada rodzicielska włączona — dotknij, żeby zdjąć",
    lockOff: "Blokada rodzicielska wyłączona — dotknij, żeby założyć",
    edLock: "Blokada rodzicielska",
    edLockHint: "Zwykle Klimat znajduje ją sam, jeśli głowica ją ma. " +
      "To pole przyda się tylko wtedy, gdy encja nazywa się nietypowo.",
    edFloor: "Ogrzewanie podłogowe (przełącznik)",
    edFloorHint: "Elektryczna podłogówka widziana w HA jako przełącznik. " +
      "Klimat sam pełni rolę termostatu: grzeje porcjami, żeby wylewka nie przestrzeliła, " +
      "i włącza z wyprzedzeniem, bo ciepło potrzebuje czasu, żeby dojść do powierzchni. " +
      "Wymaga czujnika temperatury w tym pokoju.",
    turbo: "Turbo", turboStop: "Zatrzymaj turbo",
    turboTitle: "Szybkie dogrzanie",
    turboDesc: "Grzejnik i klimatyzacja grzeją razem, aż pokój osiągnie zadaną " +
      "temperaturę. Potem klimatyzacja gaśnie i wraca harmonogram.",
    turboStart: "Włącz turbo", cancel: "Anuluj", turboTemp: "Dogrzej do",
    ruleWakeT: "Harmonogram może włączać urządzenia",
    ruleWakeD: "Gdy wyłączysz grzejnik ręcznie, zostaje wyłączony do końca " +
      "bieżącego bloku harmonogramu. Od następnego bloku Klimat włącza go z powrotem — " +
      "żeby zgaszony we wrześniu grzejnik nie został zgaszony do grudnia. " +
      "Reguły nigdy niczego nie włączają, działają wyłącznie w stronę oszczędzania.",
    levels: "Poziomy temperatur",
    days: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"],
    lvComfort: "Komfort", lvEco: "Eko", lvNight: "Noc", lvFrost: "Mróz",
    copyWeek: "Skopiuj na cały tydzień", save: "Zapisz", saving: "Zapisuję…",
    loading: "Wczytuję…", applyNow: "Zastosuj teraz", saveRules: "Zapisz reguły",
    noRooms: "Najpierw dodaj pokoje w edytorze karty.",
    schedHint: "Dotknij bloku, żeby zmienić temperaturę, podzielić go albo usunąć. " +
      "Pionowe uchwyty między blokami możesz przeciągać w lewo i w prawo — skok co 15 minut. " +
      "Urządzenie wyłączone ręcznie zostaje wyłączone do końca bieżącego bloku.",
    dragHint: "Przeciągnij, żeby przesunąć granicę",
    ownTemp: "Własna temperatura", split: "Podziel na pół", delBlock: "Usuń blok", done: "Gotowe",
    rulesHint: "Reguły mają pierwszeństwo nad harmonogramem i zawsze działają w stronę " +
      "oszczędzania — mogą obniżyć temperaturę, nigdy jej nie podniosą.",
    ruleWinT: "Otwarte okno wstrzymuje grzanie",
    ruleWinD: "Gdy okno w pokoju jest otwarte dłużej niż chwilę, ten pokój schodzi do temperatury " +
      "postojowej. Po zamknięciu wszystko wraca samo.",
    ruleWinRooms: "Działa w {n} pokojach — tam, gdzie wskazałeś czujnik okna.",
    ruleWinNone: "Żaden pokój nie ma jeszcze wskazanego czujnika okna — dodaj go w edytorze karty.",
    ruleAwayT: "Nikogo w domu — schodzimy niżej",
    ruleAwayD: "Gdy wszystkie wskazane osoby są poza domem, każdy pokój dostaje temperaturę " +
      "postojową. Po powrocie wraca harmonogram.",
    ruleAwayNone: "Nie masz zdefiniowanych osób w HA (Ustawienia → Osoby).",
    ruleConfT: "Nigdy grzanie i chłodzenie naraz",
    ruleConfD: "W jednym pokoju pracuje tylko jedno urządzenie — to, które wynika z trybu " +
      "Zima/Lato. Drugie jest wyłączane.",
    goesTo: "schodzi do", after: "po", min: "min", enable: "Włącz regułę",
    histHint: "Linia ciągła to temperatura zmierzona, przerywana to zadana. " +
      "Jeśli ciągła nigdy nie dogania przerywanej, grzejnik w tym pokoju nie wyrabia.",
    measured: "zmierzona", wanted: "zadana", noData: "Brak danych z tego okresu.",
    h24: "24 godziny", days3: "3 dni", days7: "7 dni", now: "teraz",
    srvMissing: "Brakuje części serwerowej.",
    srvMissingD: "Harmonogram i reguły muszą działać też wtedy, gdy nikt nie patrzy na ekran. " +
      "Zainstaluj integrację Klimat: Ustawienia → Urządzenia i usługi → Dodaj integrację → Klimat.",
    histErr: "Nie udało się wczytać historii.",
    edTitle: "Tytuł karty", edLayout: "Układ kafelków",
    edLayoutAuto: "Dopasuj do szerokości ekranu", edLayout1: "Jeden pod drugim",
    edLayout2: "Dwa obok siebie", edLayout3: "Trzy obok siebie",
    edLayoutHint: "Na wąskim ekranie kafelki i tak ustawią się jeden pod drugim.",
    edOutside: "Temperatura na zewnątrz", edOutsideHint: "Prognoza pogody albo własny czujnik.",
    edOutsideNone: "— nie pokazuj —",
    edSeason: "Przełącznik lato / zima",
    edSeasonNone: "— brak, wybieraj automatycznie —",
    edSeasonHint: "Wyłączony = zima (sterujesz ogrzewaniem), włączony = lato (klimatyzacją). " +
      "Pomocnika typu Przełącznik utworzysz w Ustawienia → Pomocnicy.",
    edRooms: "Pokoje", edName: "Nazwa",
    edHeating: "Ogrzewanie (głowica / termostat)", edAc: "Klimatyzacja",
    edSensor: "Czujnik temperatury", edSensorNone: "— weź z termostatu —",
    edWindow: "Czujnik okna", edNone: "— brak —",
    edPrimary: "Czym sterują plus i minus",
    edPrimaryAuto: "Automatycznie (wg pory roku)",
    edPrimaryHeat: "Zawsze ogrzewanie", edPrimaryAc: "Zawsze klimatyzacja",
    edPresets: "Temperatury dla trybów",
    edHome: "W domu", edAway: "Poza domem", edNight: "Noc",
    edAddArea: "Dodaj pokój z obszaru", edPickArea: "— wybierz obszar —", edAdd: "Dodaj",
    edAddAreaHint: "Karta sama znajdzie głowice, klimatyzację i czujnik przypisane do obszaru.",
    edAddEmpty: "+ Dodaj pusty pokój", edDel: "Usuń", edUp: "W górę", edDown: "W dół",
    mAllOff: "Wszystko off",
    cardDesc: "Ogrzewanie i chłodzenie — pokoje, harmonogram, reguły, historia.",
  },
  en: {
    outside: "outside", winter: "Winter", summer: "Summer",
    tabRooms: "Rooms", tabSched: "Schedule", tabRules: "Rules", tabHist: "History",
    tabEnergy: "Energy",
    enThisMonth: "this month", enLastMonth: "last month", enYear: "last 12 months",
    enTotal: "Total", enNone: "No room has an energy meter assigned — " +
      "add one in the card editor, under \u201cEnergy meter\u201d.",
    enHint: "The numbers come from Home Assistant's own statistics, the same ones the " +
      "Energy dashboard uses. Klimat does not recalculate them, it just breaks them down " +
      "by room.",
    enErr: "Could not load the statistics.",
    edEnergy: "Energy meter (kWh)",
    edEnergyHint: "A consumption meter from a socket or relay, for example a Shelly. " +
      "It must be a cumulative meter, not instantaneous power in watts.",
    edPrice: "Price per kWh", edPriceHint: "Leave empty to hide costs.",
    stHeat: "heating", stCool: "cooling", stIdle: "ready", stNone: "none",
    doHeat: "heating", doCool: "cooling", doHold: "holding", doNone: "unavailable",
    target: "target", room: "Room", newRoom: "New room",
    down: "Lower the temperature", up: "Raise the temperature",
    heating: "Heating", ac: "Air conditioning", sensor: "Sensor", window: "Window",
    on: "on", off: "off", missing: "none", waiting: "waiting",
    opened: "open", closed: "closed",
    winJust: "Window just opened", winFor: "Window open for {m} min",
    winHeld: "heating paused", winSoon: "heating pauses in {m} min",
    winDevOff: "heating is off anyway", winRuleOff: "the open-window rule is switched off",
    winStillOn: "heating still on",
    resume: "Back to schedule",
    rManual: "manual until {t}", rMidnight: "manual until midnight",
    rWindow: "window open", rAway: "nobody home", rOff: "switched off by hand",
    rOffUntil: "off until {t}", rOffMidnight: "off until midnight",
    rTurbo: "turbo to {t}°",
    rPreheat: "warming up for {t}", rNoSensor: "no sensor",
    floor: "Underfloor",
    lockOn: "Child lock on — tap to release",
    lockOff: "Child lock off — tap to engage",
    edLock: "Child lock",
    edLockHint: "Klimat normally finds it by itself when the valve has one. " +
      "This field only matters when the entity has an unusual name.",
    edFloor: "Underfloor heating (switch)",
    edFloorHint: "Electric underfloor heating that appears in HA as a switch. " +
      "Klimat acts as the thermostat itself: it heats in portions so the slab does not " +
      "overshoot, and starts early, because the heat needs time to reach the surface. " +
      "Needs a temperature sensor in that room.",
    turbo: "Turbo", turboStop: "Stop turbo",
    turboTitle: "Quick warm-up",
    turboDesc: "The radiator and the air conditioning heat together until the room " +
      "reaches the temperature you set. Then the air conditioning switches off and " +
      "the schedule takes over again.",
    turboStart: "Start turbo", cancel: "Cancel", turboTemp: "Warm up to",
    ruleWakeT: "The schedule may switch devices on",
    ruleWakeD: "Switch a radiator off by hand and it stays off until the current " +
      "schedule block ends. From the next block Klimat switches it back on — so a " +
      "radiator turned off in September is not still off in December. " +
      "Rules never switch anything on; they only ever save energy.",
    levels: "Temperature levels",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    lvComfort: "Comfort", lvEco: "Eco", lvNight: "Night", lvFrost: "Frost",
    copyWeek: "Copy to whole week", save: "Save", saving: "Saving…",
    loading: "Loading…", applyNow: "Apply now", saveRules: "Save rules",
    noRooms: "Add rooms in the card editor first.",
    schedHint: "Tap a block to change its temperature, split it or remove it. " +
      "Drag the handles between blocks left and right — 15 minute steps. " +
      "A device switched off by hand stays off until the current block ends.",
    dragHint: "Drag to move the boundary",
    ownTemp: "Custom temperature", split: "Split in half", delBlock: "Remove block", done: "Done",
    rulesHint: "Rules take precedence over the schedule and always work towards saving — " +
      "they can lower the temperature, never raise it.",
    ruleWinT: "Open window pauses heating",
    ruleWinD: "When a window in the room stays open, that room drops to a standby temperature. " +
      "Everything comes back on its own once it is closed.",
    ruleWinRooms: "Active in {n} rooms — those with a window sensor assigned.",
    ruleWinNone: "No room has a window sensor yet — add one in the card editor.",
    ruleAwayT: "Nobody home — go lower",
    ruleAwayD: "When everyone listed is away, every room drops to a standby temperature. " +
      "The schedule returns when someone comes back.",
    ruleAwayNone: "No people defined in HA (Settings → People).",
    ruleConfT: "Never heat and cool at once",
    ruleConfD: "Only one device works per room — the one implied by Winter/Summer mode. " +
      "The other is switched off.",
    goesTo: "drops to", after: "after", min: "min", enable: "Enable rule",
    histHint: "The solid line is the measured temperature, the dashed one is the target. " +
      "If the solid line never catches up, that radiator cannot keep up.",
    measured: "measured", wanted: "target", noData: "No data for this period.",
    h24: "24 hours", days3: "3 days", days7: "7 days", now: "now",
    srvMissing: "The server part is missing.",
    srvMissingD: "The schedule and rules must work when nobody is looking at the screen. " +
      "Install the Klimat integration: Settings → Devices & services → Add integration → Klimat.",
    histErr: "Could not load history.",
    edTitle: "Card title", edLayout: "Tile layout",
    edLayoutAuto: "Fit to screen width", edLayout1: "One below another",
    edLayout2: "Two side by side", edLayout3: "Three side by side",
    edLayoutHint: "On a narrow screen tiles always stack into one column.",
    edOutside: "Outdoor temperature", edOutsideHint: "A weather forecast or your own sensor.",
    edOutsideNone: "— do not show —",
    edSeason: "Summer / winter switch",
    edSeasonNone: "— none, choose automatically —",
    edSeasonHint: "Off = winter (you control heating), on = summer (air conditioning). " +
      "Create a Toggle helper in Settings → Devices & services → Helpers.",
    edRooms: "Rooms", edName: "Name",
    edHeating: "Heating (valve / thermostat)", edAc: "Air conditioning",
    edSensor: "Temperature sensor", edSensorNone: "— take from thermostat —",
    edWindow: "Window sensor", edNone: "— none —",
    edPrimary: "What plus and minus control",
    edPrimaryAuto: "Automatically (by season)",
    edPrimaryHeat: "Always heating", edPrimaryAc: "Always air conditioning",
    edPresets: "Temperatures for house modes",
    edHome: "Home", edAway: "Away", edNight: "Night",
    edAddArea: "Add a room from an area", edPickArea: "— pick an area —", edAdd: "Add",
    edAddAreaHint: "The card will find valves, air conditioning and sensors assigned to that area.",
    edAddEmpty: "+ Add an empty room", edDel: "Remove", edUp: "Up", edDown: "Down",
    mAllOff: "Everything off",
    cardDesc: "Heating and cooling — rooms, schedule, rules, history.",
  },
};

// separator dziesiętny — zależy od języka interfejsu
let DEC = ".";

function langOf(hass) {
  const l = (hass && ((hass.locale && hass.locale.language) || hass.language)) || "en";
  const lang = String(l).toLowerCase().startsWith("pl") ? "pl" : "en";
  DEC = lang === "pl" ? "," : ".";
  return lang;
}
function tr(lang, key, vars) {
  const pack = STR[lang] || STR.en;
  let s = pack[key];
  if (s === undefined) s = STR.en[key] !== undefined ? STR.en[key] : key;
  if (vars && typeof s === "string") {
    Object.keys(vars).forEach((k) => { s = s.replace("{" + k + "}", vars[k]); });
  }
  return s;
}

/* ================= skala termiczna ================= */

const STOPS = [
  [16, [58, 130, 200]],
  [18, [110, 165, 205]],
  [20, [176, 180, 172]],
  [22, [226, 150, 70]],
  [24, [214, 95, 40]],
];
const RMIN = 15, RMAX = 26;

function lerp(a, b, t) { return a + (b - a) * t; }
function rgbStr(c) { return `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`; }
function tempColor(t) {
  if (!isFinite(t)) return "var(--klimat-ink-3)";
  if (t <= STOPS[0][0]) return rgbStr(STOPS[0][1]);
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i], b = STOPS[i + 1];
    if (t <= b[0]) {
      const k = (t - a[0]) / (b[0] - a[0]);
      return rgbStr([lerp(a[1][0], b[1][0], k), lerp(a[1][1], b[1][1], k), lerp(a[1][2], b[1][2], k)]);
    }
  }
  return rgbStr(STOPS[STOPS.length - 1][1]);
}
function pctPos(t) {
  if (!isFinite(t)) return 0;
  return Math.max(0, Math.min(100, ((t - RMIN) / (RMAX - RMIN)) * 100));
}
function fmt(t, dash = "—") {
  return isFinite(t) ? Number(t).toFixed(1).replace(".", DEC) : dash;
}
function num(v) {
  const n = parseFloat(v);
  return isFinite(n) ? n : NaN;
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}
function hhmm(h) {
  const i = Math.floor(h);
  const m = Math.round((h - i) * 60);
  return `${i < 10 ? "0" : ""}${i}:${m < 10 ? "0" : ""}${m}`;
}

function defaultLevels(lang) {
  return [
    { key: "komfort", name: tr(lang, "lvComfort"), t: 21.5 },
    { key: "eko", name: tr(lang, "lvEco"), t: 19 },
    { key: "noc", name: tr(lang, "lvNight"), t: 18 },
    { key: "mroz", name: tr(lang, "lvFrost"), t: 16 },
  ];
}
const LVL_KEYS = { komfort: "lvComfort", eko: "lvEco", noc: "lvNight", mroz: "lvFrost" };

const DEFAULT_DAY = [
  { h: 0, lvl: "noc", t: 18 },
  { h: 6, lvl: "komfort", t: 21.5 },
  { h: 8.5, lvl: "eko", t: 19 },
  { h: 16, lvl: "komfort", t: 21.5 },
  { h: 22.5, lvl: "noc", t: 18 },
];

/* ================= obszary ================= */

function areaOfEntity(hass, entityId) {
  const ent = hass.entities && hass.entities[entityId];
  if (!ent) return null;
  if (ent.area_id) return ent.area_id;
  if (ent.device_id && hass.devices && hass.devices[ent.device_id]) {
    return hass.devices[ent.device_id].area_id || null;
  }
  return null;
}
function entitiesInArea(hass, areaId, domain) {
  const out = [];
  Object.keys(hass.states || {}).forEach((id) => {
    if (domain && id.split(".")[0] !== domain) return;
    if (areaOfEntity(hass, id) === areaId) out.push(id);
  });
  return out;
}
function isEnergySensor(hass, id) {
  if (!id.startsWith("sensor.")) return false;
  const s = hass.states[id];
  if (!s || !s.attributes) return false;
  const unit = String(s.attributes.unit_of_measurement || "").toLowerCase();
  const cls = s.attributes.state_class;
  // liczy się licznik narastający, nie chwilowa moc
  return s.attributes.device_class === "energy"
    && (unit === "kwh" || unit === "wh" || unit === "mwh")
    && (cls === "total_increasing" || cls === "total");
}

/** Blokada rodzicielska bywa nazwana po swojemu — szukamy jej na tym samym urządzeniu. */
const LOCK_WORDS = ["child_lock", "childlock", "child lock", "blokada", "kindersicherung",
  "verrouillage", "kinderslot", "bloqueo"];

function findChildLock(hass, climateId) {
  if (!climateId || !hass.entities) return null;
  const own = hass.entities[climateId];
  const deviceId = own && own.device_id;
  if (!deviceId) return null;

  const hit = Object.keys(hass.entities).find((id) => {
    const domain = id.split(".")[0];
    if (domain !== "switch" && domain !== "lock") return false;
    if (hass.entities[id].device_id !== deviceId) return false;
    const st = hass.states[id];
    const label = `${id} ${(st && st.attributes && st.attributes.friendly_name) || ""}`
      .toLowerCase();
    return LOCK_WORDS.some((w) => label.indexOf(w) >= 0);
  });
  return hit || null;
}

function isTempSensor(hass, id) {
  if (!id.startsWith("sensor.")) return false;
  const s = hass.states[id];
  return !!(s && s.attributes && s.attributes.device_class === "temperature");
}

const STYLES = `
:host{
  --klimat-surface: var(--ha-card-background, var(--card-background-color, #1D2025));
  --klimat-surface-2: rgba(127,127,127,.12);
  --klimat-line: var(--divider-color, rgba(127,127,127,.26));
  --klimat-ink: var(--primary-text-color, #F2EFEB);
  --klimat-ink-2: var(--secondary-text-color, #A8A29A);
  --klimat-ink-3: color-mix(in srgb, var(--primary-text-color, #F2EFEB) 45%, transparent);
  --klimat-warm: #E8833A;
  --klimat-cool: #4EA2DE;
  --klimat-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  display:block;
}
*{box-sizing:border-box}
.card{
  background:var(--klimat-surface);
  border-radius: var(--ha-card-border-radius, 18px);
  border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--klimat-line));
  box-shadow: var(--ha-card-box-shadow, none);
  padding:18px;overflow:hidden;
}
.head{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}
.title{font-size:24px;font-weight:700;letter-spacing:-.02em;margin:0;color:var(--klimat-ink)}
.outside{margin-left:auto;display:flex;align-items:baseline;gap:7px;color:var(--klimat-ink-2);font-size:13px}
.outside b{font-family:var(--klimat-mono);font-weight:500;font-size:17px;color:var(--klimat-ink);font-variant-numeric:tabular-nums}

.season{display:inline-flex;border:1px solid var(--klimat-line);border-radius:99px;overflow:hidden}
.season button{background:transparent;border:none;color:var(--klimat-ink-2);font:inherit;font-size:13px;
  padding:7px 16px;cursor:pointer;transition:.15s}
.season button[aria-pressed="true"]{color:#17150F;font-weight:600}
.season button[data-s="zima"][aria-pressed="true"]{background:var(--klimat-cool)}
.season button[data-s="lato"][aria-pressed="true"]{background:var(--klimat-warm)}

.modes{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:16px;scrollbar-width:none}
.modes::-webkit-scrollbar{display:none}
.mode{flex:0 0 auto;display:flex;align-items:center;gap:8px;border:1px solid var(--klimat-line);
  background:transparent;color:var(--klimat-ink-2);border-radius:99px;padding:8px 15px 8px 11px;
  font:inherit;font-size:14px;cursor:pointer;transition:.18s}
.mode:hover{border-color:var(--klimat-ink-3)}
.mode .dot{width:9px;height:9px;border-radius:50%;background:var(--klimat-ink-3)}
.mode[aria-pressed="true"]{background:var(--klimat-ink);color:var(--klimat-surface);border-color:var(--klimat-ink)}
.mode[aria-pressed="true"] .dot{background:var(--klimat-warm)}

.tabs{display:flex;gap:2px;overflow-x:auto;border-bottom:1px solid var(--klimat-line);margin-bottom:18px;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{flex:0 0 auto;background:none;border:none;border-bottom:2px solid transparent;color:var(--klimat-ink-3);
  font:inherit;font-size:14px;font-weight:500;padding:11px 13px;cursor:pointer;transition:.15s;margin-bottom:-1px}
.tab:hover{color:var(--klimat-ink-2)}
.tab[aria-selected="true"]{color:var(--klimat-ink);border-bottom-color:var(--klimat-warm)}

.rooms{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.rooms.cols-1{grid-template-columns:1fr}
.rooms.cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
.rooms.cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:620px){.rooms.cols-2,.rooms.cols-3{grid-template-columns:1fr}}

.room{position:relative;background:var(--klimat-surface-2);border:1px solid var(--klimat-line);border-radius:16px;
  padding:16px;min-width:0;display:flex;flex-direction:column;gap:13px;overflow:hidden}
.room.dim{opacity:.6}
.room.window{border-color:var(--klimat-cool);
  background:linear-gradient(180deg,color-mix(in srgb,var(--klimat-cool) 13%,transparent),var(--klimat-surface-2) 70%)}
.room.window::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--klimat-cool)}
.winbar{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--klimat-cool);font-weight:500}
.winbar svg{flex:0 0 auto}
/* [hidden] musi wygrać z display:flex — inaczej pasek widać w każdym pokoju */
[hidden]{display:none!important}
.resume{align-self:flex-start;border:1px solid var(--klimat-warm);background:transparent;color:var(--klimat-warm);
  border-radius:9px;padding:6px 12px;font:inherit;font-size:12.5px;cursor:pointer;transition:.15s}
.resume:hover{background:color-mix(in srgb,var(--klimat-warm) 14%,transparent)}
.acts{display:flex;gap:8px;flex-wrap:wrap}
.acts:empty{display:none}
.turbo{border-color:var(--klimat-ink-3);color:var(--klimat-ink-2)}
.turbo:hover{border-color:var(--klimat-ink);color:var(--klimat-ink);background:var(--klimat-surface-2)}
.turbo.on{background:var(--klimat-warm);border-color:var(--klimat-warm);color:#17150F;font-weight:600}
.turbo.on:hover{background:var(--klimat-warm)}
.room-head{display:flex;align-items:flex-start;gap:10px}
.room-name{font-size:18px;font-weight:700;letter-spacing:-.01em;margin:0;color:var(--klimat-ink)}
.room-sub{font-size:12.5px;color:var(--klimat-ink-3);margin:2px 0 0}
.room-sub .why{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:99px;font-size:11.5px;
  background:color-mix(in srgb,var(--klimat-warm) 18%,transparent);color:var(--klimat-warm)}
.lockbtn{margin-left:auto;flex:0 0 auto;width:28px;height:28px;border-radius:8px;border:none;
  background:transparent;color:var(--klimat-ink-3);cursor:pointer;display:grid;place-items:center;
  padding:0;transition:.15s;order:3}
.lockbtn:hover{background:var(--klimat-surface-2);color:var(--klimat-ink-2)}
.lockbtn.on{color:var(--klimat-warm)}
.lockbtn + .state{margin-left:0}
.state{margin-left:auto;font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;
  padding:4px 9px;border-radius:99px;white-space:nowrap}
.state.heat{background:color-mix(in srgb,var(--klimat-warm) 18%,transparent);color:var(--klimat-warm)}
.state.cool{background:color-mix(in srgb,var(--klimat-cool) 18%,transparent);color:var(--klimat-cool)}
.state.idle,.state.na{background:var(--klimat-surface-2);color:var(--klimat-ink-3)}

.readout{display:flex;align-items:flex-end;gap:12px}
.now{font-family:var(--klimat-mono);font-size:38px;font-weight:500;line-height:1;letter-spacing:-.03em;
  color:var(--klimat-ink);font-variant-numeric:tabular-nums}
.now span{font-size:17px;color:var(--klimat-ink-3)}
.target{margin-left:auto;display:flex;align-items:center;gap:8px}
.step{width:34px;height:34px;border-radius:50%;border:1px solid var(--klimat-line);background:transparent;
  color:var(--klimat-ink);font-size:19px;line-height:1;cursor:pointer;transition:.15s;display:grid;place-items:center;padding:0}
.step:hover{background:var(--klimat-surface-2)}
.step:active{transform:scale(.93)}
.step[disabled]{opacity:.3;cursor:default}
.setpoint{font-family:var(--klimat-mono);font-size:20px;font-weight:500;min-width:56px;text-align:center;
  color:var(--klimat-ink);font-variant-numeric:tabular-nums}

.ribbon{position:relative;height:7px;border-radius:99px;cursor:pointer;touch-action:none;
  background:linear-gradient(90deg,#3F8FC4 0%,#7FA8BE 32%,#B9A894 56%,#D9752F 100%)}
.ribbon::after{content:"";position:absolute;left:0;right:0;top:-14px;bottom:-14px}
.ribbon.grabbing{cursor:grabbing}
.ribbon .mark{position:absolute;top:50%;width:3px;height:17px;border-radius:2px;background:var(--klimat-ink);
  transform:translate(-50%,-50%);box-shadow:0 0 0 2.5px var(--klimat-surface)}
.ribbon .goal{position:absolute;top:50%;width:15px;height:15px;border-radius:50%;z-index:1;
  border:2.5px solid var(--klimat-surface);transform:translate(-50%,-50%);
  box-shadow:0 1px 4px rgba(0,0,0,.35);transition:width .12s,height .12s}
.ribbon.grabbing .goal{width:21px;height:21px}
.scale{display:flex;justify-content:space-between;font-family:var(--klimat-mono);font-size:10.5px;
  color:var(--klimat-ink-3);margin-top:5px}

.devices{display:flex;gap:7px;flex-wrap:wrap;border-top:1px solid var(--klimat-line);padding-top:12px}
.chip{display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--klimat-ink-2);
  background:var(--klimat-surface-2);border:1px solid transparent;border-radius:8px;padding:5px 9px;
  font-family:inherit;cursor:pointer;transition:.15s}
.chip:hover{border-color:var(--klimat-line)}
.chip[data-static]{cursor:default}
.chip[data-static]:hover{border-color:transparent}
.chip b{font-family:var(--klimat-mono);font-weight:500;color:var(--klimat-ink);font-variant-numeric:tabular-nums}
.chip.muted,.chip.muted b{color:var(--klimat-ink-3)}
.chip.active{border-color:var(--klimat-warm)}
.led{width:6px;height:6px;border-radius:50%;background:var(--klimat-ink-3);flex:0 0 auto}
.led.on{background:var(--klimat-warm)}
.led.cool{background:var(--klimat-cool)}

.soon{color:var(--klimat-ink-3);font-size:14px;padding:30px 4px;text-align:center}
.ver{margin-top:14px;text-align:right;font-family:var(--klimat-mono);font-size:10px;color:var(--klimat-ink-3)}

.schedbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.days{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none}
.days::-webkit-scrollbar{display:none}
.day{flex:0 0 auto;border:1px solid var(--klimat-line);background:transparent;color:var(--klimat-ink-2);
  border-radius:9px;padding:7px 12px;font:inherit;font-size:13px;cursor:pointer;transition:.15s}
.day[aria-pressed="true"]{background:var(--klimat-ink);color:var(--klimat-surface);border-color:var(--klimat-ink)}
.day.today{box-shadow:inset 0 -2px 0 var(--klimat-warm)}
.sbtn{border:1px solid var(--klimat-line);background:transparent;color:var(--klimat-ink-2);border-radius:9px;
  padding:7px 13px;font:inherit;font-size:13px;cursor:pointer;transition:.15s}
.sbtn:hover{border-color:var(--klimat-ink-3);color:var(--klimat-ink)}
.sbtn.primary{background:var(--klimat-warm);border-color:var(--klimat-warm);color:#17150F;font-weight:600}
.sbtn[disabled]{opacity:.45;cursor:default}
.srow{display:grid;grid-template-columns:96px 1fr;align-items:center;gap:12px;margin-bottom:10px}
.srow-name{font-size:13.5px;color:var(--klimat-ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.track{position:relative;height:46px;border-radius:9px;overflow:hidden;background:var(--klimat-surface-2);touch-action:pan-y}
.blk{position:absolute;top:0;bottom:0;border:none;padding:0;cursor:pointer;transition:filter .12s;overflow:hidden}
.blk:hover{filter:brightness(1.1)}
.blk .lab{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:1px;font-family:var(--klimat-mono);color:#17150F;font-variant-numeric:tabular-nums;line-height:1.1}
.blk .lab .t{font-size:12px;font-weight:500}
.blk .lab .h{font-size:9.5px;opacity:.72}
.grab{position:absolute;top:0;bottom:0;width:16px;margin-left:-8px;cursor:ew-resize;z-index:3;
  display:grid;place-items:center;touch-action:none}
.grab::after{content:"";width:2px;height:60%;border-radius:2px;background:rgba(10,8,5,.45);transition:.12s}
.grab:hover::after,.grab.dragging::after{background:rgba(10,8,5,.9);width:3px;height:78%}
.nowline{position:absolute;top:0;bottom:0;width:2px;background:var(--klimat-ink);opacity:.55;pointer-events:none;z-index:2}
.dragtip{position:absolute;top:-26px;transform:translateX(-50%);background:var(--klimat-ink);color:var(--klimat-surface);
  font-family:var(--klimat-mono);font-size:11px;padding:3px 7px;border-radius:6px;pointer-events:none;z-index:5;white-space:nowrap}
.hours{display:grid;grid-template-columns:96px 1fr;gap:12px;margin-top:4px}
.hours-in{position:relative;height:16px}
.hours-in i{position:absolute;top:0;width:1px;height:4px;background:var(--klimat-line)}
.hours-in b{position:absolute;top:5px;transform:translateX(-50%);font-family:var(--klimat-mono);
  font-size:10px;font-weight:400;color:var(--klimat-ink-3)}
.hours-in b:first-of-type{transform:none}
.hours-in b:last-of-type{transform:translateX(-100%)}
.sched-note{font-size:12.5px;color:var(--klimat-ink-3);margin:14px 0 0}
.sched-err{font-size:13.5px;color:var(--klimat-ink-2);background:var(--klimat-surface-2);
  border:1px solid var(--klimat-line);border-radius:12px;padding:16px;line-height:1.6}

.levels-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;padding:12px;border-radius:12px;
  background:var(--klimat-surface-2);border:1px solid var(--klimat-line)}
.levels-bar .cap{width:100%;font-size:11.5px;letter-spacing:.07em;text-transform:uppercase;
  color:var(--klimat-ink-3);margin-bottom:2px}
.lvl{display:flex;align-items:center;gap:7px;border:1px solid var(--klimat-line);border-radius:10px;
  padding:6px 9px;background:transparent}
.lvl i{width:10px;height:10px;border-radius:3px;flex:0 0 auto}
.lvl span{font-size:13px;color:var(--klimat-ink)}
.lvl input{width:62px;padding:5px 7px;border-radius:7px;border:1px solid var(--klimat-line);
  background:transparent;color:var(--klimat-ink);font:inherit;font-family:var(--klimat-mono);font-size:13px;
  font-variant-numeric:tabular-nums}

.rules{display:grid;gap:12px}
.rule{display:flex;gap:14px;align-items:flex-start;background:var(--klimat-surface-2);
  border:1px solid var(--klimat-line);border-radius:14px;padding:16px;min-width:0}
.rule h4{margin:0 0 4px;font-size:15px;font-weight:600;color:var(--klimat-ink)}
.rule p{margin:0;font-size:13px;color:var(--klimat-ink-2);line-height:1.5}
.rule .opts{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:11px}
.rule .opt{display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--klimat-ink-3)}
.rule .opt input[type="number"]{width:68px;padding:6px 8px;border-radius:7px;border:1px solid var(--klimat-line);
  background:transparent;color:var(--klimat-ink);font:inherit;font-family:var(--klimat-mono);font-size:13px}
.rule.off{opacity:.55}
.sw{flex:0 0 auto;width:46px;height:27px;border-radius:99px;border:none;background:var(--klimat-line);
  cursor:pointer;position:relative;transition:.2s;margin-left:auto;padding:0}
.sw::after{content:"";position:absolute;top:3px;left:3px;width:21px;height:21px;border-radius:50%;
  background:var(--klimat-surface);transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.sw[aria-pressed="true"]{background:#4CAF7D}
.sw[aria-pressed="true"]::after{transform:translateX(19px)}
.persons{display:flex;flex-wrap:wrap;gap:7px;margin-top:4px}
.person{display:flex;align-items:center;gap:6px;font-size:12.5px;border:1px solid var(--klimat-line);
  background:transparent;border-radius:99px;padding:5px 11px;cursor:pointer;color:var(--klimat-ink-3);
  font-family:inherit;transition:.15s}
.person[aria-pressed="true"]{border-color:#4CAF7D;color:var(--klimat-ink)}

.charts{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}
.chart{background:var(--klimat-surface-2);border:1px solid var(--klimat-line);border-radius:16px;padding:16px;min-width:0}
.chart-head{display:flex;align-items:baseline;gap:10px;margin-bottom:10px}
.chart-head h4{margin:0;font-size:16px;font-weight:700;color:var(--klimat-ink)}
.chart-head em{font-style:normal;margin-left:auto;font-family:var(--klimat-mono);font-size:12.5px;
  color:var(--klimat-ink-2);font-variant-numeric:tabular-nums}
.chart svg{display:block;width:100%;height:auto}
.enrow{display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px;color:var(--klimat-ink-3);margin-bottom:10px}
.enrow b{font-family:var(--klimat-mono);font-weight:500;color:var(--klimat-ink);font-variant-numeric:tabular-nums}
.legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:9px;font-size:12px;color:var(--klimat-ink-3)}
.legend i{display:inline-block;width:16px;height:0;border-top-width:2px;border-top-style:solid;
  vertical-align:middle;margin-right:5px}

.sheet-bg{position:fixed;inset:0;background:rgba(10,9,8,.55);z-index:9;display:grid;place-items:center;padding:16px}
.sheet{background:var(--klimat-surface);border:1px solid var(--klimat-line);border-radius:18px;padding:20px;
  width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,.4)}
.sheet h3{margin:0 0 2px;font-size:18px;color:var(--klimat-ink)}
.sheet .sub{margin:0 0 16px;font-size:13px;color:var(--klimat-ink-3)}
.levels{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px}
.level{border:1px solid var(--klimat-line);background:transparent;border-radius:11px;padding:11px;
  text-align:left;font:inherit;cursor:pointer;color:var(--klimat-ink);transition:.15s}
.level:hover{border-color:var(--klimat-ink-3)}
.level[aria-pressed="true"]{border-color:var(--klimat-warm);background:color-mix(in srgb,var(--klimat-warm) 12%,transparent)}
.level b{display:block;font-size:14px}
.level i{font-style:normal;font-family:var(--klimat-mono);font-size:13px;color:var(--klimat-ink-2)}
.fine{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.fine label{font-size:13px;color:var(--klimat-ink-2);flex:1}
.fine input{width:90px;padding:8px;border-radius:8px;border:1px solid var(--klimat-line);
  background:transparent;color:var(--klimat-ink);font:inherit;font-family:var(--klimat-mono)}
.sheet-acts{display:flex;gap:8px;flex-wrap:wrap}
.sheet-acts .sbtn{flex:1 1 auto}

@media (max-width:460px){.title{font-size:21px}.now{font-size:32px}
  .srow{grid-template-columns:80px 1fr;gap:10px}.hours{grid-template-columns:80px 1fr;gap:10px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;

class KlimatCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._built = false;
    this._view = "pokoje";
    this._pending = {};
    this._localSet = {};
    this._lang = "en";
  }

  static getConfigElement() { return document.createElement("klimat-card-editor"); }
  static getStubConfig(hass) {
    const rooms = [];
    const areas = hass && hass.areas ? Object.keys(hass.areas) : [];
    areas.slice(0, 3).forEach((aid) => {
      const cl = entitiesInArea(hass, aid, "climate");
      if (!cl.length) return;
      rooms.push({ name: hass.areas[aid].name, climate: cl[0] });
    });
    return { type: "custom:klimat-card", title: "Klimat", rooms };
  }

  t(key, vars) { return tr(this._lang, key, vars); }

  setConfig(config) {
    if (!config || !Array.isArray(config.rooms)) {
      throw new Error('Klimat Card: missing "rooms" list.');
    }
    this._config = Object.assign({ title: "Klimat", step: 0.5 }, config);
    this._built = false;
    if (this.shadowRoot) this.shadowRoot.innerHTML = "";
  }

  set hass(hass) {
    const lang = langOf(hass);
    if (lang !== this._lang) {
      this._lang = lang;
      this._built = false;
      if (this.shadowRoot) this.shadowRoot.innerHTML = "";
    }
    this._hass = hass;
    if (!this._built) this._build();
    this._update();
  }

  disconnectedCallback() {
    clearInterval(this._poll);
  }

  getCardSize() {
    const n = (this._config && this._config.rooms && this._config.rooms.length) || 1;
    return 4 + Math.ceil(n / 2) * 3;
  }

  get _season() {
    const id = this._config.season_entity;
    if (!id || !this._hass || !this._hass.states[id]) return null;
    return this._hass.states[id].state === "on" ? "lato" : "zima";
  }

  /* ---------- budowa ---------- */

  _build() {
    const cfg = this._config;
    const modes = cfg.modes || [];
    const root = document.createElement("div");
    root.className = "card";

    root.innerHTML = `
      <div class="head">
        <h1 class="title">${esc(cfg.title)}</h1>
        ${cfg.season_entity ? `<div class="season">
          <button data-s="zima" aria-pressed="false">${esc(this.t("winter"))}</button>
          <button data-s="lato" aria-pressed="false">${esc(this.t("summer"))}</button>
        </div>` : ""}
        ${cfg.outside ? `<div class="outside">${esc(this.t("outside"))} <b data-outside>—</b></div>` : ""}
      </div>
      ${modes.length ? `<div class="modes">
        ${modes.map((m, i) => `<button class="mode" data-mode="${i}" aria-pressed="false"><span class="dot"></span>${esc(this._modeName(m))}</button>`).join("")}
      </div>` : ""}
      <div class="tabs" role="tablist">
        <button class="tab" role="tab" data-view="pokoje" aria-selected="true">${esc(this.t("tabRooms"))}</button>
        <button class="tab" role="tab" data-view="harmonogram" aria-selected="false">${esc(this.t("tabSched"))}</button>
        <button class="tab" role="tab" data-view="reguly" aria-selected="false">${esc(this.t("tabRules"))}</button>
        <button class="tab" role="tab" data-view="historia" aria-selected="false">${esc(this.t("tabHist"))}</button>
        <button class="tab" role="tab" data-view="zuzycie" aria-selected="false">${esc(this.t("tabEnergy"))}</button>
      </div>
      <div data-view-pokoje><div class="rooms${cfg.columns ? " cols-" + cfg.columns : ""}" data-rooms></div></div>
      <div data-view-harmonogram hidden><div data-sched></div></div>
      <div data-view-reguly hidden><div data-rules></div></div>
      <div data-view-historia hidden><div data-hist></div></div>
      <div data-view-zuzycie hidden><div data-energy></div></div>
      <div class="ver">Klimat ${VERSION}</div>
    `;

    const style = document.createElement("style");
    style.textContent = STYLES;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(root);
    this._root = root;

    root.querySelectorAll(".tab").forEach((t) => {
      t.addEventListener("click", () => this._setView(t.dataset.view));
    });
    root.querySelectorAll(".mode").forEach((m) => {
      m.addEventListener("click", () => this._applyMode(parseInt(m.dataset.mode, 10)));
    });
    root.querySelectorAll(".season button").forEach((b) => {
      b.addEventListener("click", () => {
        this._hass.callService("input_boolean", b.dataset.s === "lato" ? "turn_on" : "turn_off", {
          entity_id: this._config.season_entity,
        });
      });
    });

    const wrap = root.querySelector("[data-rooms]");
    this._roomEls = cfg.rooms.map((r, i) => {
      const el = document.createElement("div");
      el.className = "room";
      el.innerHTML = `
        <div class="room-head">
          <div style="min-width:0">
            <h3 class="room-name">${esc(r.name || this.t("room"))}</h3>
            <p class="room-sub" data-sub>—</p>
          </div>
          <button class="lockbtn" data-lock hidden></button>
          <span class="state na" data-state>—</span>
        </div>
        <div class="readout">
          <div class="now" data-now>—<span>°</span></div>
          <div class="target">
            <button class="step" data-step="-1" aria-label="${esc(this.t("down"))}: ${esc(r.name || "")}">−</button>
            <span class="setpoint" data-set>—</span>
            <button class="step" data-step="1" aria-label="${esc(this.t("up"))}: ${esc(r.name || "")}">+</button>
          </div>
        </div>
        <div>
          <div class="ribbon">
            <i class="goal" data-goal style="left:0%"></i>
            <i class="mark" data-mark style="left:0%"></i>
          </div>
          <div class="scale"><span>${RMIN}°</span><span>20°</span><span>${RMAX}°</span></div>
        </div>
        <div class="winbar" data-winbar hidden>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M12 3v18M3 12h18"/>
          </svg>
          <span data-wintext></span>
        </div>
        <div class="devices" data-devices></div>
        <div class="acts">
          <button class="resume" data-resume hidden>${esc(this.t("resume"))}</button>
          <button class="resume turbo" data-turbo hidden>${esc(this.t("turbo"))}</button>
        </div>
      `;
      el.querySelectorAll(".step").forEach((b) => {
        b.addEventListener("click", () => this._nudge(i, parseInt(b.dataset.step, 10)));
      });
      el.querySelector("[data-resume]").addEventListener("click", async () => {
        try {
          await this._hass.connection.sendMessagePromise({
            type: "klimat/room/resume", room: r.name || this.t("room"),
          });
          setTimeout(() => this._loadSched(), 1200);
        } catch (e) { /* brak dodatku / add-on missing */ }
      });
      el.querySelector("[data-lock]").addEventListener("click", () => this._toggleLock(i));
      el.querySelector("[data-turbo]").addEventListener("click", () => {
        const rn = r.name || this.t("room");
        if (this._turbo && this._turbo[rn] != null) this._stopTurbo(rn);
        else this._openTurboSheet(i);
      });
      this._wireRibbon(el, i);
      wrap.appendChild(el);
      return el;
    });

    this._built = true;
    if (!this._schedLoaded) this._loadSched();

    // w trakcie turbo odświeżamy stan, żeby kafelek sam zgasł po osiągnięciu celu
    clearInterval(this._poll);
    this._poll = setInterval(() => {
      const turboOn = this._turbo && Object.keys(this._turbo).length;
      const hasFloor = (this._config.rooms || []).some((r) => r.heat_switch);
      if (turboOn || hasFloor) this._loadSched();
    }, 30000);
  }

  _modeName(m) {
    if (m.name) return m.name;
    if (m.all_off || m.off === true) return this.t("mAllOff");
    const map = { home: "edHome", away: "edAway", night: "edNight" };
    return map[m.key] ? this.t(map[m.key]) : (m.key || "");
  }

  _wireRibbon(el, idx) {
    const ribbon = el.querySelector(".ribbon");
    ribbon.addEventListener("pointerdown", (ev) => {
      const room = this._config.rooms[idx];
      const s = this._readRoom(room, idx);
      if (!s.primaryId && !s.floorId) return;
      ev.preventDefault();

      const rect = ribbon.getBoundingClientRect();
      const attrs = (s.primary && s.primary.attributes) || {};
      const step = num(attrs.target_temp_step) || this._config.step || 0.5;
      const lo = isFinite(num(attrs.min_temp)) ? num(attrs.min_temp) : RMIN;
      const hi = isFinite(num(attrs.max_temp)) ? num(attrs.max_temp) : RMAX;

      const valueAt = (clientX) => {
        const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        let t = RMIN + frac * (RMAX - RMIN);
        t = Math.round(t / step) * step;
        return Math.max(lo, Math.min(hi, Math.round(t * 10) / 10));
      };

      ribbon.classList.add("grabbing");
      if (ribbon.setPointerCapture) ribbon.setPointerCapture(ev.pointerId);

      const move = (e) => {
        const x = e.clientX != null ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
        if (x == null) return;
        this._localSet[idx] = valueAt(x);
        this._update();
      };
      move(ev);

      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        ribbon.classList.remove("grabbing");
        const v = this._localSet[idx];
        if (isFinite(v)) {
          clearTimeout(this._pending[idx]);
          this._sendTarget(idx, v);
          setTimeout(() => { delete this._localSet[idx]; this._update(); }, 3000);
        }
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    });
  }

  _setView(v) {
    this._view = v;
    this._root.querySelectorAll(".tab").forEach((t) => {
      t.setAttribute("aria-selected", t.dataset.view === v ? "true" : "false");
    });
    ["pokoje", "harmonogram", "reguly", "historia", "zuzycie"].forEach((name) => {
      this._root.querySelector(`[data-view-${name}]`).hidden = name !== v;
    });
    if ((v === "harmonogram" || v === "reguly") && !this._schedLoaded) this._loadSched();
    else if (v === "reguly") this._renderRules();
    if (v === "historia" && !this._histLoaded) this._loadHistory();
    if (v === "zuzycie" && !this._energyLoaded) this._loadEnergy();
  }

  /* ---------- odczyt stanu ---------- */

  _readRoom(r, idx) {
    const H = this._hass;

    // Podłogówka na przełączniku nie ma termostatu — temperaturę zadaną
    // trzyma dodatek, a nie urządzenie.
    if (r.heat_switch) {
      const sw = H.states[r.heat_switch];
      const rn = r.name || this.t("room");
      let now = NaN;
      if (r.sensor && H.states[r.sensor]) now = num(H.states[r.sensor].state);
      const set = (idx in this._localSet)
        ? this._localSet[idx]
        : num((this._targets || {})[rn]);
      let mode = "idle";
      if (!sw || sw.state === "unavailable" || sw.state === "unknown") mode = "na";
      else if (sw.state === "on") mode = "heat";
      return {
        heat: null, ac: null, primary: null, primaryId: null,
        floorId: r.heat_switch, floor: (this._floor || {})[rn] || {},
        now, set, mode,
      };
    }
    const heat = r.climate ? H.states[r.climate] : null;
    const ac = r.ac ? H.states[r.ac] : null;
    const season = this._season;
    const alive = (e) => e && e.state !== "unavailable" && e.state !== "unknown";

    let primary = null, primaryId = null;
    const pick = (e, id) => { primary = e; primaryId = id; };

    if (r.primary === "climate" && heat) pick(heat, r.climate);
    else if (r.primary === "ac" && ac) pick(ac, r.ac);
    else if (season === "zima" && heat) pick(heat, r.climate);
    else if (season === "lato" && ac) pick(ac, r.ac);
    else if (alive(ac) && ac.state !== "off") pick(ac, r.ac);
    else if (alive(heat)) pick(heat, r.climate);
    else if (ac) pick(ac, r.ac);
    else if (heat) pick(heat, r.climate);

    let now = NaN;
    if (r.sensor && H.states[r.sensor]) now = num(H.states[r.sensor].state);
    if (!isFinite(now) && primary) now = num(primary.attributes.current_temperature);

    let set = NaN;
    if (idx in this._localSet) set = this._localSet[idx];
    else if (primary) set = num(primary.attributes.temperature);

    let mode = "idle";
    const action = primary && primary.attributes ? primary.attributes.hvac_action : null;
    if (!alive(primary)) mode = "na";
    else if (action === "heating") mode = "heat";
    else if (action === "cooling") mode = "cool";
    else if (primary.state === "off") mode = "idle";
    else if (isFinite(set) && isFinite(now)) {
      if (primary.state === "cool") mode = set < now - 0.2 ? "cool" : "idle";
      else mode = set > now + 0.2 ? "heat" : "idle";
    }
    return { heat, ac, primary, primaryId, now, set, mode };
  }

  /** Powód z dodatku → tekst w języku interfejsu. */
  _reasonText(raw) {
    if (!raw || raw === "schedule") return null;
    if (raw === "window") return this.t("rWindow");
    if (raw === "away") return this.t("rAway");
    if (raw === "off_manual") return this.t("rOff");
    if (raw.indexOf("manual:") === 0) {
      const v = raw.slice(7);
      return v === "midnight" ? this.t("rMidnight") : this.t("rManual", { t: v });
    }
    if (raw === "no_sensor") return this.t("rNoSensor");
    if (raw.indexOf("preheat:") === 0) {
      return this.t("rPreheat", { t: raw.slice(8) });
    }
    if (raw.indexOf("turbo:") === 0) {
      return this.t("rTurbo", { t: fmt(parseFloat(raw.slice(6))) });
    }
    if (raw.indexOf("off:") === 0) {
      const v = raw.slice(4);
      return v === "midnight" ? this.t("rOffMidnight") : this.t("rOffUntil", { t: v });
    }
    return raw;
  }

  /**
   * Pasek otwartego okna mówi, co naprawdę dzieje się z grzaniem,
   * zamiast zakładać, że skoro okno jest otwarte, to grzejnik pracuje.
   */
  _windowText(winState, s, rawWhy) {
    const openMin = (Date.now() - new Date(winState.last_changed).getTime()) / 60000;
    const since = openMin < 1 ? this.t("winJust") : this.t("winFor", { m: Math.round(openMin) });

    const rule = (this._sched && this._sched.rules && this._sched.rules.window_open) || null;
    const devOff = !s.primaryId || !s.primary || s.primary.state === "off"
      || s.primary.state === "unavailable" || s.primary.state === "unknown";

    let tail;
    if (rawWhy === "window") tail = this.t("winHeld");
    else if (devOff) tail = this.t("winDevOff");
    else if (rule && !rule.enabled) tail = this.t("winRuleOff");
    else if (rule && isFinite(num(rule.delay_min)) && openMin < num(rule.delay_min)) {
      tail = this.t("winSoon", { m: Math.max(1, Math.ceil(num(rule.delay_min) - openMin)) });
    } else tail = this.t("winStillOn");

    return `${since} — ${tail}`;
  }

  _update() {
    if (!this._built || !this._hass) return;
    const cfg = this._config;

    if (cfg.outside) {
      const o = this._hass.states[cfg.outside];
      const el = this._root.querySelector("[data-outside]");
      if (el) {
        let t = NaN;
        if (o) t = cfg.outside.startsWith("weather.") ? num(o.attributes.temperature) : num(o.state);
        el.textContent = fmt(t) + "°";
      }
    }

    const season = this._season;
    this._root.querySelectorAll(".season button").forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.s === season ? "true" : "false");
    });

    cfg.rooms.forEach((r, i) => {
      const el = this._roomEls[i];
      const s = this._readRoom(r, i);

      el.classList.toggle("dim", s.mode === "na");
      el.querySelector("[data-now]").innerHTML = `${fmt(s.now)}<span>°</span>`;
      el.querySelector("[data-set]").textContent = isFinite(s.set) ? fmt(s.set) + "°" : "—";

      const stateEl = el.querySelector("[data-state]");
      stateEl.className = "state " + s.mode;
      stateEl.textContent = {
        heat: this.t("stHeat"), cool: this.t("stCool"),
        idle: this.t("stIdle"), na: this.t("stNone"),
      }[s.mode];

      const bits = [];
      if (isFinite(s.set)) bits.push(`${this.t("target")} ${fmt(s.set)}°`);
      bits.push({
        heat: this.t("doHeat"), cool: this.t("doCool"),
        idle: this.t("doHold"), na: this.t("doNone"),
      }[s.mode]);

      const rawWhy = this._reasons && this._reasons[r.name];
      const why = this._reasonText(rawWhy);
      const sub = el.querySelector("[data-sub]");
      sub.textContent = bits.join(" · ");
      if (why) {
        const tag = document.createElement("span");
        tag.className = "why";
        tag.textContent = why;
        sub.appendChild(tag);
      }

      const goal = el.querySelector("[data-goal]");
      goal.style.left = pctPos(s.set) + "%";
      goal.style.background = tempColor(s.set);
      goal.style.visibility = isFinite(s.set) ? "visible" : "hidden";
      const mark = el.querySelector("[data-mark]");
      mark.style.left = pctPos(s.now) + "%";
      mark.style.visibility = isFinite(s.now) ? "visible" : "hidden";

      el.querySelectorAll(".step").forEach((b) => { b.disabled = !(s.primaryId || s.floorId); });

      const winState = r.window ? this._hass.states[r.window] : null;
      const winOpen = !!(winState && winState.state === "on");
      el.classList.toggle("window", winOpen);
      const winbar = el.querySelector("[data-winbar]");
      winbar.hidden = !winOpen;
      if (winOpen) {
        el.querySelector("[data-wintext]").textContent = this._windowText(winState, s, rawWhy);
      }

      el.querySelector("[data-resume]").hidden =
        !(rawWhy && (rawWhy.indexOf("manual") === 0 || rawWhy.indexOf("off:") === 0));

      const rn = r.name || this.t("room");
      const turboOn = !!(this._turbo && this._turbo[rn] != null);
      const turboOk = !!(this._canTurbo && this._canTurbo.indexOf(rn) >= 0);
      const tb = el.querySelector("[data-turbo]");
      tb.hidden = !(turboOk || turboOn);
      tb.textContent = turboOn ? this.t("turboStop") : this.t("turbo");
      tb.classList.toggle("on", turboOn);

      this._renderLock(el, r, i);
      this._renderDevices(el.querySelector("[data-devices]"), r, s);
    });
  }

  _renderDevices(wrap, r, s) {
    const bits = [];
    if (r.climate) {
      const e = s.heat;
      const on = e && e.state !== "off" && e.state !== "unavailable";
      const valve = e && e.attributes ? e.attributes.valve_position : null;
      const v = !e || e.state === "unavailable" ? this.t("missing")
        : (e.state === "off" ? this.t("off") : (isFinite(num(valve)) ? Math.round(num(valve)) + "%" : this.t("on")));
      bits.push({ k: r.climate_name || this.t("heating"), v, led: on ? "on" : "",
        muted: !e || e.state === "unavailable", id: r.climate, active: s.primaryId === r.climate });
    }
    if (r.ac) {
      const e = s.ac;
      const on = e && e.state !== "off" && e.state !== "unavailable";
      const v = !e || e.state === "unavailable" ? this.t("missing") : (e.state === "off" ? this.t("off") : e.state);
      bits.push({ k: r.ac_name || this.t("ac"), v, led: on ? "cool" : "",
        muted: !e || e.state === "unavailable", id: r.ac, active: s.primaryId === r.ac });
    }
    if (r.heat_switch) {
      const e = this._hass.states[r.heat_switch];
      const on = e && e.state === "on";
      const duty = num((s.floor || {}).duty);
      const v = !e ? this.t("missing")
        : (isFinite(duty) ? Math.round(duty * 100) + "%" : (on ? this.t("on") : this.t("off")));
      bits.push({ k: this.t("floor"), v, led: on ? "on" : "",
        muted: !e, id: r.heat_switch, active: on });
    }
    if (r.sensor) {
      const e = this._hass.states[r.sensor];
      bits.push({ k: this.t("sensor"), v: e ? fmt(num(e.state)) + "°" : this.t("waiting"),
        led: "", muted: !e, static: true });
    }
    if (r.window) {
      const e = this._hass.states[r.window];
      const open = e && e.state === "on";
      bits.push({ k: this.t("window"),
        v: !e ? this.t("missing") : (open ? this.t("opened") : this.t("closed")),
        led: "", muted: !e || !open, static: true });
    }

    const html = bits.map((b) =>
      `<button class="chip${b.muted ? " muted" : ""}${b.active ? " active" : ""}"${b.static ? " data-static" : ` data-entity="${b.id}"`}><i class="led ${b.led}"></i>${esc(b.k)} <b>${esc(String(b.v))}</b></button>`
    ).join("");

    if (wrap._html !== html) {
      wrap.innerHTML = html;
      wrap._html = html;
      wrap.querySelectorAll("[data-entity]").forEach((c) => {
        c.addEventListener("click", () => this._moreInfo(c.dataset.entity));
      });
    }
  }

  /** Encja blokady: ręcznie wskazana albo znaleziona na urządzeniu głowicy. */
  _lockEntity(r, idx) {
    if (r.child_lock) return r.child_lock;
    this._lockCache = this._lockCache || {};
    if (!(idx in this._lockCache)) {
      this._lockCache[idx] = findChildLock(this._hass, r.climate) || null;
    }
    return this._lockCache[idx];
  }

  _renderLock(el, r, idx) {
    const btn = el.querySelector("[data-lock]");
    const id = this._lockEntity(r, idx);
    const st = id ? this._hass.states[id] : null;
    if (!st || st.state === "unavailable" || st.state === "unknown") {
      btn.hidden = true;
      return;
    }
    const locked = st.state === "on" || st.state === "locked";
    btn.hidden = false;
    btn.classList.toggle("on", locked);
    btn.title = this.t(locked ? "lockOn" : "lockOff");
    btn.setAttribute("aria-label", btn.title);
    btn.setAttribute("aria-pressed", locked ? "true" : "false");
    const shackle = locked
      ? "M8 11V7a4 4 0 0 1 8 0v4"
      : "M8 11V7a4 4 0 0 1 7.5-2";
    btn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <rect x="4" y="11" width="16" height="10" rx="2"/><path d="${shackle}"/></svg>`;
  }

  _toggleLock(idx) {
    const r = this._config.rooms[idx];
    const id = this._lockEntity(r, idx);
    const st = id ? this._hass.states[id] : null;
    if (!st) return;
    if (id.startsWith("lock.")) {
      this._hass.callService("lock", st.state === "locked" ? "unlock" : "lock",
        { entity_id: id });
    } else {
      this._hass.callService("switch", "toggle", { entity_id: id });
    }
  }

  _moreInfo(entityId) {
    const ev = new Event("hass-more-info", { bubbles: true, composed: true });
    ev.detail = { entityId };
    this.dispatchEvent(ev);
  }

  _sendTarget(idx, value) {
    const r = this._config.rooms[idx];
    const s = this._readRoom(r, idx);
    if (s.primaryId) {
      this._hass.callService("climate", "set_temperature",
        { entity_id: s.primaryId, temperature: value });
      return;
    }
    if (s.floorId) {
      this._hass.connection
        .sendMessagePromise({
          type: "klimat/room/target", room: r.name || this.t("room"), temp: value,
        })
        .then(() => setTimeout(() => this._loadSched(), 800))
        .catch(() => {});
    }
  }

  _nudge(idx, dir) {
    const r = this._config.rooms[idx];
    const s = this._readRoom(r, idx);
    if (!s.primaryId && !s.floorId) return;

    const attrs = (s.primary && s.primary.attributes) || {};
    const step = num(attrs.target_temp_step) || this._config.step || 0.5;
    const min = s.floorId ? 10 : num(attrs.min_temp);
    const max = s.floorId ? 30 : num(attrs.max_temp);
    const base = isFinite(s.set) ? s.set : (isFinite(s.now) ? s.now : 20);
    let next = base + dir * step;
    if (isFinite(min)) next = Math.max(min, next);
    if (isFinite(max)) next = Math.min(max, next);
    next = Math.round(next * 10) / 10;

    this._localSet[idx] = next;
    this._update();

    clearTimeout(this._pending[idx]);
    this._pending[idx] = setTimeout(() => {
      this._sendTarget(idx, next);
      setTimeout(() => { delete this._localSet[idx]; this._update(); }, 3000);
    }, 450);
  }

  _applyMode(mi) {
    const mode = this._config.modes[mi];
    if (!mode) return;
    this._root.querySelectorAll(".mode").forEach((m, i) => {
      m.setAttribute("aria-pressed", i === mi ? "true" : "false");
    });
    if (mode.script) {
      this._hass.callService("script", "turn_on", { entity_id: mode.script });
      return;
    }
    this._config.rooms.forEach((r, i) => {
      const s = this._readRoom(r, i);
      if (!s.primaryId) return;
      if (mode.all_off || mode.off === true) {
        this._hass.callService("climate", "set_hvac_mode", { entity_id: s.primaryId, hvac_mode: "off" });
        return;
      }
      const t = num(r.presets && r.presets[mode.key]);
      if (!isFinite(t)) return;
      this._localSet[i] = t;
      this._hass.callService("climate", "set_temperature", { entity_id: s.primaryId, temperature: t });
    });
    this._update();
    setTimeout(() => { this._localSet = {}; this._update(); }, 3000);
  }

  /* ================= TURBO ================= */

  async _stopTurbo(roomName) {
    try {
      await this._hass.connection.sendMessagePromise({
        type: "klimat/room/turbo/stop", room: roomName,
      });
    } catch (e) { /* brak dodatku */ }
    setTimeout(() => this._loadSched(), 1000);
  }

  _openTurboSheet(idx) {
    const r = this._config.rooms[idx];
    const roomName = r.name || this.t("room");
    const s = this._readRoom(r, idx);
    const attrs = (s.primary && s.primary.attributes) || {};
    const lo = isFinite(num(attrs.min_temp)) ? num(attrs.min_temp) : 15;
    const hi = isFinite(num(attrs.max_temp)) ? num(attrs.max_temp) : 30;
    const base = isFinite(s.set) ? s.set : (isFinite(s.now) ? s.now : 21);
    let goal = Math.max(lo, Math.min(hi, Math.round((base + 2) * 2) / 2));

    const bg = document.createElement("div");
    bg.className = "sheet-bg";
    bg.innerHTML = `
      <div class="sheet" role="dialog">
        <h3>${esc(this.t("turboTitle"))} · ${esc(roomName)}</h3>
        <p class="sub">${esc(this.t("turboDesc"))}</p>
        <div class="readout" style="margin-bottom:18px">
          <div class="now" data-goal>${fmt(goal)}<span>°</span></div>
          <div class="target">
            <button class="step" data-d="-1" aria-label="−">−</button>
            <button class="step" data-d="1" aria-label="+">+</button>
          </div>
        </div>
        <div class="sheet-acts">
          <button class="sbtn" data-cancel>${esc(this.t("cancel"))}</button>
          <button class="sbtn primary" data-go>${esc(this.t("turboStart"))}</button>
        </div>
      </div>`;

    const show = () => { bg.querySelector("[data-goal]").innerHTML = `${fmt(goal)}<span>°</span>`; };
    bg.querySelectorAll(".step").forEach((b) => {
      b.addEventListener("click", () => {
        goal = Math.max(lo, Math.min(hi, Math.round((goal + (+b.dataset.d) * 0.5) * 2) / 2));
        show();
      });
    });
    const close = () => bg.remove();
    bg.querySelector("[data-cancel]").addEventListener("click", close);
    bg.addEventListener("click", (e) => { if (e.target === bg) close(); });
    bg.querySelector("[data-go]").addEventListener("click", async () => {
      close();
      try {
        await this._hass.connection.sendMessagePromise({
          type: "klimat/room/turbo", room: roomName, temp: goal,
        });
      } catch (e) { /* brak dodatku */ }
      setTimeout(() => this._loadSched(), 1000);
    });
    this._root.appendChild(bg);
  }


  /* ================= ZUŻYCIE / ENERGY ================= */

  get _currency() {
    const c = this._hass && this._hass.config && this._hass.config.currency;
    return c || (this._lang === "pl" ? "zł" : "");
  }

  _money(kwh) {
    const price = num(this._config.price);
    if (!isFinite(price) || !isFinite(kwh)) return null;
    const v = kwh * price;
    const txt = v.toFixed(2).replace(".", DEC);
    return this._currency ? `${txt} ${this._currency}` : txt;
  }

  async _loadEnergy() {
    this._energyLoaded = true;
    const box = this._root.querySelector("[data-energy]");
    const rooms = (this._config.rooms || []).filter((r) => r.energy);
    if (!rooms.length) {
      box.innerHTML = `<p class="soon">${esc(this.t("enNone"))}</p>`;
      return;
    }
    box.innerHTML = `<p class="soon">${esc(this.t("loading"))}</p>`;

    // dwanaście pełnych miesięcy wstecz, licząc od pierwszego dnia bieżącego
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    start.setMonth(start.getMonth() - 11);

    try {
      const res = await this._hass.connection.sendMessagePromise({
        type: "recorder/statistics_during_period",
        start_time: start.toISOString(),
        statistic_ids: rooms.map((r) => r.energy),
        period: "month",
        types: ["change"],
      });
      this._energy = res || {};
      this._energyErr = null;
    } catch (err) {
      this._energyErr = err && err.message ? err.message : String(err);
    }
    this._renderEnergy();
  }

  /** Statystyki na 12 pozycji, od najstarszego miesiąca do bieżącego. */
  _months(entityId) {
    const now = new Date();
    const out = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push({ d, v: NaN });
    }
    const rows = (this._energy || {})[entityId] || [];
    rows.forEach((row) => {
      const raw = row.start;
      const d = new Date(typeof raw === "number" ? raw : raw);
      if (isNaN(d.getTime())) return;
      const slot = out.find((o) => o.d.getFullYear() === d.getFullYear()
        && o.d.getMonth() === d.getMonth());
      if (slot) slot.v = num(row.change);
    });
    return out;
  }

  _renderEnergy() {
    const box = this._root.querySelector("[data-energy]");
    if (!box) return;
    if (this._energyErr) {
      box.innerHTML = `<div class="sched-err">${esc(this.t("enErr"))}<br>
        <span style="opacity:.7">${esc(this._energyErr)}</span></div>`;
      return;
    }
    if (!this._energy) return;

    const rooms = (this._config.rooms || []).filter((r) => r.energy);
    const monthLabel = (d) =>
      d.toLocaleDateString(this._lang === "pl" ? "pl-PL" : "en-GB", { month: "short" });

    const totals = new Array(12).fill(0);
    const cards = rooms.map((r, ri) => {
      const series = this._months(r.energy);
      series.forEach((m, i) => { if (isFinite(m.v)) totals[i] += m.v; });

      const nowV = series[11].v;
      const prevV = series[10].v;
      const max = Math.max(...series.map((m) => (isFinite(m.v) ? m.v : 0)), 0.001);

      const W = 320, H = 110, PB = 18, gap = 3;
      const bw = (W - gap * 11) / 12;
      const bars = series.map((m, i) => {
        const v = isFinite(m.v) ? m.v : 0;
        const h = Math.max(v > 0 ? 2 : 0, ((H - PB) * v) / max);
        const x = i * (bw + gap);
        const col = i === 11 ? "var(--klimat-warm)" : "var(--klimat-ink-3)";
        return `<rect x="${x.toFixed(1)}" y="${(H - PB - h).toFixed(1)}"
          width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${col}"><title>${
            esc(monthLabel(m.d))} ${fmt(m.v)} kWh</title></rect>
          <text x="${(x + bw / 2).toFixed(1)}" y="${H - 5}" text-anchor="middle"
            font-size="8.5" fill="var(--klimat-ink-3)" font-family="monospace"
            >${esc(monthLabel(m.d).slice(0, 3))}</text>`;
      }).join("");

      const cost = this._money(nowV);
      return `
        <div class="chart">
          <div class="chart-head">
            <h4>${esc(r.name || this.t("room"))}</h4>
            <em>${isFinite(nowV) ? fmt(nowV) + " kWh" : "—"}</em>
          </div>
          <div class="enrow">
            <span>${esc(this.t("enThisMonth"))}: <b>${isFinite(nowV) ? fmt(nowV) + " kWh" : "—"}</b>${
              cost ? ` · <b>${esc(cost)}</b>` : ""}</span>
            <span>${esc(this.t("enLastMonth"))}: <b>${isFinite(prevV) ? fmt(prevV) + " kWh" : "—"}</b></span>
          </div>
          <svg viewBox="0 0 ${W} ${H}" role="img"
            aria-label="${esc(r.name || "")} — ${esc(this.t("enYear"))}">${bars}</svg>
        </div>`;
    }).join("");

    const sumNow = totals[11];
    const sumPrev = totals[10];
    const sumCost = this._money(sumNow);
    const summary = rooms.length > 1 ? `
      <div class="chart" style="margin-bottom:14px">
        <div class="chart-head">
          <h4>${esc(this.t("enTotal"))}</h4>
          <em>${fmt(sumNow)} kWh</em>
        </div>
        <div class="enrow">
          <span>${esc(this.t("enThisMonth"))}: <b>${fmt(sumNow)} kWh</b>${
            sumCost ? ` · <b>${esc(sumCost)}</b>` : ""}</span>
          <span>${esc(this.t("enLastMonth"))}: <b>${fmt(sumPrev)} kWh</b></span>
        </div>
      </div>` : "";

    box.innerHTML = `${summary}<div class="charts">${cards}</div>
      <p class="sched-note">${esc(this.t("enHint"))}</p>`;
  }

  /* ================= HARMONOGRAM / SCHEDULE ================= */

  async _loadSched() {
    this._schedLoaded = true;
    const box = this._root.querySelector("[data-sched]");
    if (box && !this._sched) box.innerHTML = `<p class="soon">${esc(this.t("loading"))}</p>`;
    try {
      const cfg = await this._hass.connection.sendMessagePromise({ type: "klimat/config/get" });
      this._reasons = (cfg && cfg.reasons) || {};
      this._turbo = (cfg && cfg.turbo) || {};
      this._canTurbo = (cfg && cfg.can_turbo) || [];
      this._targets = (cfg && cfg.targets) || {};
      this._floor = (cfg && cfg.floor) || {};
      this._sched = this._mergeSched(cfg);
      this._schedErr = null;
      if (this._roomsDiffer(cfg)) this._saveSched();
    } catch (err) {
      this._schedErr = err && err.message ? err.message : String(err);
    }
    this._renderSched();
    this._renderRules();
  }

  _mergeSched(stored) {
    const out = {
      enabled: stored && stored.enabled !== false,
      season_entity: this._config.season_entity || null,
      rules: (stored && stored.rules) || {},
      levels: (stored && stored.levels && stored.levels.length)
        ? stored.levels.map((l) => Object.assign({}, l))
        : defaultLevels(this._lang),
      rooms: [],
    };
    const old = (stored && stored.rooms) || [];
    this._config.rooms.forEach((r) => {
      const name = r.name || this.t("room");
      const prev = old.find((o) => o.name === name);
      out.rooms.push({
        name,
        heat: r.climate || null,
        cool: r.ac || null,
        sensor: r.sensor || null,
        heat_switch: r.heat_switch || null,
        window: r.window || null,
        days: prev && Array.isArray(prev.days) && prev.days.length === 7
          ? prev.days
          : Array.from({ length: 7 }, () => DEFAULT_DAY.map((b) => Object.assign({}, b))),
      });
    });
    return out;
  }

  _roomsDiffer(stored) {
    const theirs = (stored && stored.rooms) || [];
    const mine = this._sched.rooms;
    if (theirs.length !== mine.length) return true;
    return mine.some((r) => {
      const t = theirs.find((o) => o.name === r.name);
      if (!t) return true;
      return (t.heat || null) !== (r.heat || null)
        || (t.cool || null) !== (r.cool || null)
        || (t.sensor || null) !== (r.sensor || null)
        || (t.heat_switch || null) !== (r.heat_switch || null)
        || (t.window || null) !== (r.window || null);
    });
  }

  _levelName(l) {
    // nazwy domyślnych poziomów pokazujemy w języku interfejsu
    const key = LVL_KEYS[l.key];
    const defaults = ["Komfort", "Eko", "Noc", "Mróz", "Comfort", "Eco", "Night", "Frost"];
    if (key && (!l.name || defaults.indexOf(l.name) >= 0)) return this.t(key);
    return l.name || l.key;
  }

  _blockTemp(b) {
    if (b && b.lvl) {
      const levels = (this._sched && this._sched.levels) || defaultLevels(this._lang);
      const lvl = levels.find((l) => l.key === b.lvl);
      if (lvl && isFinite(parseFloat(lvl.t))) return parseFloat(lvl.t);
    }
    return parseFloat(b && b.t);
  }

  _renderSched() {
    const box = this._root.querySelector("[data-sched]");
    if (!box) return;
    if (this._schedErr) { box.innerHTML = this._serverMissingHtml(); return; }
    if (!this._sched) return;

    const DAYS = this.t("days");
    if (this._schedDay == null) this._schedDay = (new Date().getDay() + 6) % 7;
    const todayIdx = (new Date().getDay() + 6) % 7;
    const d = this._schedDay;
    const nowPct = ((new Date().getHours() + new Date().getMinutes() / 60) / 24) * 100;
    const levels = this._sched.levels || defaultLevels(this._lang);

    const rows = this._sched.rooms.map((room, ri) => {
      const blocks = (room.days[d] || []).slice().sort((a, b) => a.h - b.h);
      const cells = blocks.map((b, bi) => {
        const end = bi < blocks.length - 1 ? blocks[bi + 1].h : 24;
        const span = end - b.h;
        const t = this._blockTemp(b);
        const wide = span >= 2.6, mid = span >= 1.3;
        const label = wide
          ? `<span class="lab"><span class="t">${fmt(t)}°</span><span class="h">${hhmm(b.h)}</span></span>`
          : (mid ? `<span class="lab"><span class="t">${fmt(t)}°</span></span>` : "");
        return `<button class="blk" data-r="${ri}" data-b="${bi}"
          style="left:${(b.h / 24) * 100}%;width:${(span / 24) * 100}%;background:${tempColor(t)}"
          aria-label="${esc(room.name)}, ${hhmm(b.h)}–${hhmm(end)}, ${fmt(t)}°">${label}</button>`;
      }).join("");
      const grabs = blocks.slice(1).map((b, i) =>
        `<i class="grab" data-r="${ri}" data-g="${i + 1}" style="left:${(b.h / 24) * 100}%"
          title="${esc(this.t("dragHint"))}"></i>`
      ).join("");
      return `<div class="srow">
        <div class="srow-name">${esc(room.name)}</div>
        <div class="track" data-track="${ri}">${cells}${grabs}${d === todayIdx ? `<i class="nowline" style="left:${nowPct}%"></i>` : ""}</div>
      </div>`;
    }).join("");

    box.innerHTML = `
      <div class="levels-bar">
        <span class="cap">${esc(this.t("levels"))}</span>
        ${levels.map((l, i) => `<label class="lvl">
          <i style="background:${tempColor(l.t)}"></i>
          <span>${esc(this._levelName(l))}</span>
          <input type="number" step="0.5" min="5" max="30" data-lvl="${i}" value="${l.t}">
        </label>`).join("")}
      </div>
      <div class="schedbar">
        <div class="days">
          ${DAYS.map((n, i) => `<button class="day${i === todayIdx ? " today" : ""}" data-d="${i}"
            aria-pressed="${i === d ? "true" : "false"}">${esc(n)}</button>`).join("")}
        </div>
        <button class="sbtn" data-copy>${esc(this.t("copyWeek"))}</button>
        <button class="sbtn primary" data-save ${this._schedDirty ? "" : "disabled"}>${esc(this.t("save"))}</button>
      </div>
      ${rows || `<p class="soon">${esc(this.t("noRooms"))}</p>`}
      <div class="hours"><div></div><div class="hours-in">
        ${[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => {
          const p = (h / 24) * 100;
          return `<i style="left:${p}%"></i><b style="left:${p}%">${h < 10 ? "0" : ""}${h}</b>`;
        }).join("")}
      </div></div>
      <p class="sched-note">${esc(this.t("schedHint"))}</p>
    `;

    box.querySelectorAll("[data-lvl]").forEach((f) => {
      f.addEventListener("change", () => {
        const v = parseFloat(f.value);
        if (!isFinite(v)) return;
        this._sched.levels[+f.dataset.lvl].t = Math.round(v * 10) / 10;
        this._schedDirty = true;
        this._renderSched();
      });
    });
    box.querySelectorAll(".day").forEach((b) => {
      b.addEventListener("click", () => { this._schedDay = +b.dataset.d; this._renderSched(); });
    });
    box.querySelectorAll(".blk").forEach((b) => {
      b.addEventListener("click", () => {
        if (this._justDragged) return;
        this._openBlockSheet(+b.dataset.r, +b.dataset.b);
      });
    });
    box.querySelectorAll(".grab").forEach((g) => this._wireGrab(g));
    const copyBtn = box.querySelector("[data-copy]");
    if (copyBtn) copyBtn.addEventListener("click", () => this._copyDayToWeek());
    const saveBtn = box.querySelector("[data-save]");
    if (saveBtn) saveBtn.addEventListener("click", () => this._saveSched());
  }

  _wireGrab(grab) {
    const ri = +grab.dataset.r;
    const gi = +grab.dataset.g;
    const track = grab.parentElement;

    grab.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const room = this._sched.rooms[ri];
      const blocks = room.days[this._schedDay].slice().sort((a, b) => a.h - b.h);
      const prev = blocks[gi - 1];
      const self = blocks[gi];
      const nextH = gi < blocks.length - 1 ? blocks[gi + 1].h : 24;
      const minH = prev.h + 0.25;
      const maxH = nextH - 0.25;
      if (minH > maxH) return;

      const rect = track.getBoundingClientRect();
      const blkPrev = track.querySelector(`.blk[data-b="${gi - 1}"]`);
      const blkSelf = track.querySelector(`.blk[data-b="${gi}"]`);

      const tip = document.createElement("i");
      tip.className = "dragtip";
      track.appendChild(tip);
      grab.classList.add("dragging");
      if (grab.setPointerCapture) grab.setPointerCapture(ev.pointerId);

      const move = (e) => {
        const cx = e.clientX != null ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
        if (cx == null) return;
        const x = cx - rect.left;
        let h = Math.round(((x / rect.width) * 24) * 4) / 4;
        h = Math.max(minH, Math.min(maxH, h));
        self.h = h;
        const pct = (h / 24) * 100;
        grab.style.left = pct + "%";
        tip.style.left = pct + "%";
        tip.textContent = hhmm(h);
        if (blkPrev) blkPrev.style.width = ((h - prev.h) / 24) * 100 + "%";
        if (blkSelf) {
          blkSelf.style.left = pct + "%";
          blkSelf.style.width = ((nextH - h) / 24) * 100 + "%";
        }
      };

      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        tip.remove();
        grab.classList.remove("dragging");
        this._sched.rooms[ri].days[this._schedDay] = blocks;
        this._schedDirty = true;
        this._justDragged = true;
        setTimeout(() => { this._justDragged = false; }, 250);
        this._renderSched();
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    });
  }

  _openBlockSheet(ri, bi) {
    const DAYS = this.t("days");
    const room = this._sched.rooms[ri];
    const blocks = room.days[this._schedDay].slice().sort((a, b) => a.h - b.h);
    const blk = blocks[bi];
    const end = bi < blocks.length - 1 ? blocks[bi + 1].h : 24;
    const levels = this._sched.levels || defaultLevels(this._lang);

    const bg = document.createElement("div");
    bg.className = "sheet-bg";
    bg.innerHTML = `
      <div class="sheet" role="dialog">
        <h3>${esc(room.name)}</h3>
        <p class="sub">${hhmm(blk.h)} – ${hhmm(end)} · ${esc(DAYS[this._schedDay])}</p>
        <div class="levels">
          ${levels.map((p) => `<button class="level" data-key="${esc(p.key)}" data-t="${p.t}"
            aria-pressed="${blk.lvl === p.key ? "true" : "false"}"><b>${esc(this._levelName(p))}</b><i>${fmt(p.t)}°</i></button>`).join("")}
        </div>
        <div class="fine">
          <label for="kl-temp">${esc(this.t("ownTemp"))}</label>
          <input id="kl-temp" type="number" step="0.5" min="5" max="30" value="${this._blockTemp(blk)}">
        </div>
        <div class="sheet-acts">
          <button class="sbtn" data-split>${esc(this.t("split"))}</button>
          <button class="sbtn" data-del ${blocks.length > 1 ? "" : "disabled"}>${esc(this.t("delBlock"))}</button>
          <button class="sbtn primary" data-ok>${esc(this.t("done"))}</button>
        </div>
      </div>`;

    const apply = (t, key) => {
      blk.t = Math.round(t * 10) / 10;
      if (key) blk.lvl = key; else delete blk.lvl;
      room.days[this._schedDay] = blocks;
      this._schedDirty = true;
    };

    bg.querySelectorAll(".level").forEach((l) => {
      l.addEventListener("click", () => {
        apply(parseFloat(l.dataset.t), l.dataset.key);
        bg.querySelectorAll(".level").forEach((x) => x.setAttribute("aria-pressed", x === l ? "true" : "false"));
        bg.querySelector("#kl-temp").value = blk.t;
      });
    });
    bg.querySelector("#kl-temp").addEventListener("change", (e) => {
      const v = parseFloat(e.target.value);
      if (!isFinite(v)) return;
      apply(v, null);
      bg.querySelectorAll(".level").forEach((x) => x.setAttribute("aria-pressed", "false"));
    });
    const close = () => { bg.remove(); this._renderSched(); };
    bg.querySelector("[data-split]").addEventListener("click", () => {
      const mid = Math.round(((blk.h + end) / 2) * 2) / 2;
      if (mid > blk.h && mid < end) {
        const copy = { h: mid, t: blk.t };
        if (blk.lvl) copy.lvl = blk.lvl;
        blocks.push(copy);
        room.days[this._schedDay] = blocks.sort((a, b) => a.h - b.h);
        this._schedDirty = true;
      }
      close();
    });
    bg.querySelector("[data-del]").addEventListener("click", () => {
      if (blocks.length > 1) {
        blocks.splice(bi, 1);
        if (blocks[0]) blocks[0].h = 0;
        room.days[this._schedDay] = blocks;
        this._schedDirty = true;
      }
      close();
    });
    bg.querySelector("[data-ok]").addEventListener("click", close);
    bg.addEventListener("click", (e) => { if (e.target === bg) close(); });
    this._root.appendChild(bg);
  }

  _copyDayToWeek() {
    const d = this._schedDay;
    this._sched.rooms.forEach((room) => {
      const src = room.days[d];
      room.days = room.days.map((_, i) => (i === d ? src : src.map((b) => Object.assign({}, b))));
    });
    this._schedDirty = true;
    this._renderSched();
  }

  async _saveSched(fromRules) {
    const btn = this._root.querySelector(fromRules ? "[data-rsave]" : "[data-save]");
    if (btn) { btn.disabled = true; btn.textContent = this.t("saving"); }
    try {
      this._sched.season_entity = this._config.season_entity || null;
      const saved = await this._hass.connection.sendMessagePromise({
        type: "klimat/config/set", config: this._sched,
      });
      if (saved) this._sched = this._mergeSched(saved);
      this._schedDirty = false;
      this._rulesDirty = false;
    } catch (err) {
      this._schedErr = err && err.message ? err.message : String(err);
    }
    this._renderSched();
    this._renderRules();
  }

  _serverMissingHtml() {
    return `<div class="sched-err"><b>${esc(this.t("srvMissing"))}</b><br>${esc(this.t("srvMissingD"))}
      <br><br><span style="opacity:.7">${esc(this._schedErr || "")}</span></div>`;
  }

  /* ================= REGUŁY / RULES ================= */

  _renderRules() {
    const box = this._root.querySelector("[data-rules]");
    if (!box) return;
    if (this._schedErr) { box.innerHTML = this._serverMissingHtml(); return; }
    if (!this._sched) return;

    const R = this._sched.rules || {};
    const win = R.window_open || {};
    const away = R.away || {};
    const conf = R.no_conflict || {};
    const wake = R.wake_devices || {};
    const persons = Object.keys(this._hass.states).filter((id) => id.startsWith("person.")).sort();
    const chosen = away.persons || [];
    const n = this._sched.rooms.filter((r) => r.window).length;

    box.innerHTML = `
      <div class="rules">
        <div class="rule${win.enabled ? "" : " off"}">
          <div style="min-width:0;flex:1">
            <h4>${esc(this.t("ruleWinT"))}</h4>
            <p>${esc(this.t("ruleWinD"))}</p>
            <div class="opts">
              <span class="opt">${esc(this.t("goesTo"))}
                <input type="number" step="0.5" min="5" max="25" data-rule="window_open" data-f="temp" value="${win.temp != null ? win.temp : 16}">°</span>
              <span class="opt">${esc(this.t("after"))}
                <input type="number" step="1" min="0" max="60" data-rule="window_open" data-f="delay_min" value="${win.delay_min != null ? win.delay_min : 2}"> ${esc(this.t("min"))}</span>
            </div>
            <p style="margin-top:8px;font-size:12px">${esc(n ? this.t("ruleWinRooms", { n }) : this.t("ruleWinNone"))}</p>
          </div>
          <button class="sw" data-toggle="window_open" aria-pressed="${win.enabled ? "true" : "false"}"
            aria-label="${esc(this.t("enable"))}"></button>
        </div>

        <div class="rule${away.enabled ? "" : " off"}">
          <div style="min-width:0;flex:1">
            <h4>${esc(this.t("ruleAwayT"))}</h4>
            <p>${esc(this.t("ruleAwayD"))}</p>
            <div class="opts">
              <span class="opt">${esc(this.t("goesTo"))}
                <input type="number" step="0.5" min="5" max="25" data-rule="away" data-f="temp" value="${away.temp != null ? away.temp : 17}">°</span>
            </div>
            <div class="persons">
              ${persons.length
                ? persons.map((p) => `<button class="person" data-person="${esc(p)}"
                    aria-pressed="${chosen.indexOf(p) >= 0 ? "true" : "false"}">${esc(this._hass.states[p].attributes.friendly_name || p)}</button>`).join("")
                : `<span class="opt">${esc(this.t("ruleAwayNone"))}</span>`}
            </div>
          </div>
          <button class="sw" data-toggle="away" aria-pressed="${away.enabled ? "true" : "false"}"
            aria-label="${esc(this.t("enable"))}"></button>
        </div>

        <div class="rule${conf.enabled === false ? " off" : ""}">
          <div style="min-width:0;flex:1">
            <h4>${esc(this.t("ruleConfT"))}</h4>
            <p>${esc(this.t("ruleConfD"))}</p>
          </div>
          <button class="sw" data-toggle="no_conflict" aria-pressed="${conf.enabled === false ? "false" : "true"}"
            aria-label="${esc(this.t("enable"))}"></button>
        </div>

        <div class="rule${wake.enabled === false ? " off" : ""}">
          <div style="min-width:0;flex:1">
            <h4>${esc(this.t("ruleWakeT"))}</h4>
            <p>${esc(this.t("ruleWakeD"))}</p>
          </div>
          <button class="sw" data-toggle="wake_devices" aria-pressed="${wake.enabled === false ? "false" : "true"}"
            aria-label="${esc(this.t("enable"))}"></button>
        </div>
      </div>
      <div class="schedbar" style="margin:16px 0 0">
        <button class="sbtn primary" data-rsave ${this._rulesDirty ? "" : "disabled"}>${esc(this.t("saveRules"))}</button>
        <button class="sbtn" data-apply>${esc(this.t("applyNow"))}</button>
      </div>
      <p class="sched-note">${esc(this.t("rulesHint"))}</p>
    `;

    box.querySelectorAll("[data-toggle]").forEach((b) => {
      b.addEventListener("click", () => {
        const key = b.dataset.toggle;
        this._sched.rules[key] = this._sched.rules[key] || {};
        this._sched.rules[key].enabled = b.getAttribute("aria-pressed") !== "true";
        this._rulesDirty = true;
        this._renderRules();
      });
    });
    box.querySelectorAll("[data-rule]").forEach((f) => {
      f.addEventListener("change", () => {
        const v = parseFloat(f.value);
        if (!isFinite(v)) return;
        this._sched.rules[f.dataset.rule] = this._sched.rules[f.dataset.rule] || {};
        this._sched.rules[f.dataset.rule][f.dataset.f] = v;
        this._rulesDirty = true;
        this._renderRules();
      });
    });
    box.querySelectorAll("[data-person]").forEach((p) => {
      p.addEventListener("click", () => {
        const id = p.dataset.person;
        this._sched.rules.away = this._sched.rules.away || {};
        const list = this._sched.rules.away.persons || [];
        const i = list.indexOf(id);
        if (i >= 0) list.splice(i, 1); else list.push(id);
        this._sched.rules.away.persons = list;
        this._rulesDirty = true;
        this._renderRules();
      });
    });
    const rsave = box.querySelector("[data-rsave]");
    if (rsave) rsave.addEventListener("click", () => this._saveSched(true));
    const apply = box.querySelector("[data-apply]");
    if (apply) {
      apply.addEventListener("click", async () => {
        try { await this._hass.connection.sendMessagePromise({ type: "klimat/apply" }); } catch (e) { /* nic */ }
      });
    }
  }

  /* ================= HISTORIA / HISTORY ================= */

  async _loadHistory() {
    this._histLoaded = true;
    const box = this._root.querySelector("[data-hist]");
    const hours = this._histHours || 24;
    box.innerHTML = `<p class="soon">${esc(this.t("loading"))}</p>`;

    const ids = [];
    this._config.rooms.forEach((r) => {
      if (r.sensor) ids.push(r.sensor);
      if (r.climate) ids.push(r.climate);
      if (r.ac) ids.push(r.ac);
    });
    if (!ids.length) { box.innerHTML = `<p class="soon">${esc(this.t("noRooms"))}</p>`; return; }

    const end = new Date();
    const start = new Date(end.getTime() - hours * 3600 * 1000);
    try {
      const uniq = ids.filter((v, i) => ids.indexOf(v) === i);
      const path = `history/period/${start.toISOString()}?filter_entity_id=${encodeURIComponent(uniq.join(","))}&end_time=${encodeURIComponent(end.toISOString())}`;
      const raw = await this._hass.callApi("GET", path);
      this._hist = {};
      (raw || []).forEach((series) => {
        if (series && series.length) this._hist[series[0].entity_id] = series;
      });
      this._histErr = null;
    } catch (err) {
      this._histErr = err && err.message ? err.message : String(err);
    }
    this._renderHistory();
  }

  _sample(series, pick, start, end, n) {
    const out = new Array(n).fill(null);
    if (!series || !series.length) return out;
    const stepMs = (end - start) / (n - 1);
    let si = 0, lastVal = null;
    for (let i = 0; i < n; i++) {
      const t = start + i * stepMs;
      while (si < series.length && new Date(series[si].last_changed).getTime() <= t) {
        const v = pick(series[si]);
        if (isFinite(v)) lastVal = v;
        si++;
      }
      out[i] = lastVal;
    }
    return out;
  }

  _renderHistory() {
    const box = this._root.querySelector("[data-hist]");
    if (!box) return;
    if (this._histErr) {
      box.innerHTML = `<div class="sched-err">${esc(this.t("histErr"))}<br>
        <span style="opacity:.7">${esc(this._histErr)}</span></div>`;
      return;
    }
    if (!this._hist) return;

    const hours = this._histHours || 24;
    const end = Date.now();
    const start = end - hours * 3600 * 1000;
    const N = hours <= 24 ? 96 : 168;

    const charts = this._config.rooms.map((room, ri) => {
      const climateId = room.climate || room.ac;
      const sensorSeries = room.sensor ? this._hist[room.sensor] : null;
      const climateSeries = climateId ? this._hist[climateId] : null;

      const measured = sensorSeries
        ? this._sample(sensorSeries, (s) => parseFloat(s.state), start, end, N)
        : this._sample(climateSeries, (s) => parseFloat(s.attributes && s.attributes.current_temperature), start, end, N);
      const target = this._sample(
        climateSeries,
        (s) => (s.state === "off" ? NaN : parseFloat(s.attributes && s.attributes.temperature)),
        start, end, N
      );

      const vals = measured.concat(target).filter((v) => v != null && isFinite(v));
      if (!vals.length) {
        return `<div class="chart"><div class="chart-head"><h4>${esc(room.name || this.t("room"))}</h4></div>
          <p class="soon" style="padding:18px 0">${esc(this.t("noData"))}</p></div>`;
      }

      const lo = Math.floor(Math.min.apply(null, vals) - 0.8);
      const hi = Math.ceil(Math.max.apply(null, vals) + 0.8);
      const W = 320, H = 140, PL = 32, PR = 10, PT = 10, PB = 22;
      const X = (i) => PL + ((W - PL - PR) * i) / (N - 1);
      const Y = (v) => PT + (H - PT - PB) * (1 - (v - lo) / (hi - lo || 1));

      const linePath = (arr) => {
        let d = "", pen = false;
        arr.forEach((v, i) => {
          if (v == null || !isFinite(v)) { pen = false; return; }
          d += `${pen ? "L" : "M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)} `;
          pen = true;
        });
        return d.trim();
      };

      let area = "", started = false;
      measured.forEach((v, i) => {
        if (v == null || !isFinite(v)) return;
        if (!started) { area += `M${X(i).toFixed(1)} ${Y(lo).toFixed(1)} L${X(i).toFixed(1)} ${Y(v).toFixed(1)} `; started = true; }
        else area += `L${X(i).toFixed(1)} ${Y(v).toFixed(1)} `;
      });
      if (started) area += `L${X(N - 1).toFixed(1)} ${Y(lo).toFixed(1)} Z`;

      const ticks = [lo, Math.round((lo + hi) / 2), hi];
      const grid = ticks.map((t) =>
        `<line x1="${PL}" y1="${Y(t).toFixed(1)}" x2="${W - PR}" y2="${Y(t).toFixed(1)}"
           stroke="var(--klimat-line)" stroke-width="1"/>
         <text x="${PL - 6}" y="${(Y(t) + 3.5).toFixed(1)}" text-anchor="end" font-size="9.5"
           fill="var(--klimat-ink-3)" font-family="monospace">${t}°</text>`
      ).join("");

      const rev = measured.slice().reverse();
      const revIdx = rev.findIndex((v) => v != null && isFinite(v));
      const last = revIdx >= 0 ? rev[revIdx] : null;
      const lastI = measured.length - 1 - revIdx;
      const col = tempColor(last != null ? last : 20);
      const gid = "kg-" + ri;
      const back = hours === 24 ? "−24 h" : `−${hours / 24} d`;

      return `
        <div class="chart">
          <div class="chart-head">
            <h4>${esc(room.name || this.t("room"))}</h4>
            <em>${last != null ? fmt(last) + "°" : "—"}</em>
          </div>
          <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(room.name || "")}">
            <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${col}" stop-opacity="0.26"/>
              <stop offset="100%" stop-color="${col}" stop-opacity="0.02"/>
            </linearGradient></defs>
            ${grid}
            ${area ? `<path d="${area}" fill="url(#${gid})" stroke="none"/>` : ""}
            <path d="${linePath(target)}" fill="none" stroke="var(--klimat-ink-3)" stroke-width="1.5" stroke-dasharray="4 3"/>
            <path d="${linePath(measured)}" fill="none" stroke="${col}" stroke-width="2.1"
              stroke-linejoin="round" stroke-linecap="round"/>
            ${last != null ? `<circle cx="${X(lastI).toFixed(1)}" cy="${Y(last).toFixed(1)}" r="3.4" fill="${col}"/>` : ""}
            <text x="${PL}" y="${H - 5}" font-size="9.5" fill="var(--klimat-ink-3)" font-family="monospace">${back}</text>
            <text x="${W - PR}" y="${H - 5}" text-anchor="end" font-size="9.5"
              fill="var(--klimat-ink-3)" font-family="monospace">${esc(this.t("now"))}</text>
          </svg>
          <div class="legend">
            <span><i style="border-color:${col}"></i>${esc(this.t("measured"))}</span>
            <span><i style="border-color:var(--klimat-ink-3);border-top-style:dashed"></i>${esc(this.t("wanted"))}</span>
          </div>
        </div>`;
    }).join("");

    const labels = { 24: this.t("h24"), 72: this.t("days3"), 168: this.t("days7") };
    box.innerHTML = `
      <div class="schedbar">
        ${[24, 72, 168].map((h) => `<button class="sbtn" data-h="${h}"
          style="${h === hours ? "border-color:var(--klimat-warm);color:var(--klimat-ink)" : ""}">${esc(labels[h])}</button>`).join("")}
      </div>
      <div class="charts">${charts}</div>
      <p class="sched-note">${esc(this.t("histHint"))}</p>
    `;

    box.querySelectorAll("[data-h]").forEach((b) => {
      b.addEventListener("click", () => {
        this._histHours = +b.dataset.h;
        this._histLoaded = false;
        this._loadHistory();
      });
    });
  }
}

/* ================= EDYTOR / EDITOR ================= */

const ED_STYLES = `
*{box-sizing:border-box}
:host{display:block;font-family:inherit;color:var(--primary-text-color)}
.sec{margin-bottom:22px}
.lab{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;
  color:var(--secondary-text-color);margin:0 0 6px}
input,select{width:100%;padding:9px 10px;border-radius:8px;border:1px solid var(--divider-color);
  background:var(--card-background-color);color:var(--primary-text-color);font:inherit;font-size:14px}
.row{display:flex;gap:10px;flex-wrap:wrap}
.row>*{flex:1 1 150px;min-width:0}
.room{border:1px solid var(--divider-color);border-radius:12px;padding:14px;margin-bottom:12px}
.room h4{margin:0 0 12px;font-size:15px;display:flex;align-items:center;gap:4px}
.room h4 .mv{margin-left:auto;background:none;border:1px solid var(--divider-color);border-radius:6px;
  color:var(--primary-text-color);cursor:pointer;font-size:13px;padding:2px 8px;line-height:1.4}
.room h4 .mv + .mv{margin-left:4px}
.room h4 .mv[disabled]{opacity:.3;cursor:default}
.room h4 .x{margin-left:8px;background:none;border:none;color:var(--error-color,#E5604D);
  cursor:pointer;font-size:13px;padding:4px 8px;border-radius:6px}
.f{margin-bottom:10px}
.btn{background:var(--primary-color,#03a9f4);color:#fff;border:none;border-radius:9px;
  padding:10px 16px;font:inherit;font-size:14px;cursor:pointer}
.btn.ghost{background:transparent;color:var(--primary-color,#03a9f4);border:1px dashed var(--divider-color);width:100%}
.hintline{font-size:12.5px;color:var(--secondary-text-color);margin:6px 0 0}
.add{display:flex;gap:10px;align-items:flex-end;margin-top:6px}
.add>div{flex:1}
`;

class KlimatCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._lang = "en";
  }
  t(key, vars) { return tr(this._lang, key, vars); }

  setConfig(config) {
    this._config = JSON.parse(JSON.stringify(config || {}));
    if (!Array.isArray(this._config.rooms)) this._config.rooms = [];
    this._render();
  }
  set hass(hass) {
    const first = !this._hass;
    const lang = langOf(hass);
    const changed = lang !== this._lang;
    this._hass = hass;
    this._lang = lang;
    if (first || changed) this._render();
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  _opts(ids, selected, emptyLabel) {
    const H = this._hass;
    const name = (id) => {
      const s = H && H.states[id];
      return s && s.attributes.friendly_name ? `${s.attributes.friendly_name} (${id})` : id;
    };
    return `<option value="">${esc(emptyLabel)}</option>` +
      ids.map((id) => `<option value="${esc(id)}"${id === selected ? " selected" : ""}>${esc(name(id))}</option>`).join("");
  }

  _ids(domain, filter) {
    const H = this._hass;
    if (!H) return [];
    return Object.keys(H.states)
      .filter((id) => id.split(".")[0] === domain)
      .filter((id) => (filter ? filter(id) : true))
      .sort();
  }

  _render() {
    if (!this.shadowRoot) return;
    const H = this._hass;
    const c = this._config || { rooms: [] };
    const climates = this._ids("climate");
    const temps = this._ids("sensor", (id) => isTempSensor(H, id));
    const weathers = this._ids("weather");
    const bools = this._ids("input_boolean");
    const binaries = this._ids("binary_sensor");
    const switches = this._ids("switch");
    const energies = this._ids("sensor", (id) => isEnergySensor(H, id));
    const locks = this._ids("switch").concat(this._ids("lock"));
    const areas = H && H.areas ? Object.keys(H.areas) : [];

    const roomHtml = (r, i) => `
      <div class="room" data-room="${i}">
        <h4>${esc(r.name || this.t("room") + " " + (i + 1))}
          <button class="mv" data-up="${i}" ${i === 0 ? "disabled" : ""} title="${esc(this.t("edUp"))}">↑</button>
          <button class="mv" data-down="${i}" ${i === c.rooms.length - 1 ? "disabled" : ""} title="${esc(this.t("edDown"))}">↓</button>
          <button class="x" data-del="${i}">${esc(this.t("edDel"))}</button>
        </h4>
        <div class="f"><label class="lab">${esc(this.t("edName"))}</label>
          <input type="text" data-k="name" value="${esc(r.name || "")}"></div>
        <div class="f"><label class="lab">${esc(this.t("edHeating"))}</label>
          <select data-k="climate">${this._opts(climates, r.climate, this.t("edNone"))}</select></div>
        <div class="f"><label class="lab">${esc(this.t("edAc"))}</label>
          <select data-k="ac">${this._opts(climates, r.ac, this.t("edNone"))}</select></div>
        <div class="f"><label class="lab">${esc(this.t("edFloor"))}</label>
          <select data-k="heat_switch">${this._opts(switches, r.heat_switch, this.t("edNone"))}</select>
          <p class="hintline">${esc(this.t("edFloorHint"))}</p></div>
        <div class="f"><label class="lab">${esc(this.t("edSensor"))}</label>
          <select data-k="sensor">${this._opts(temps, r.sensor, this.t("edSensorNone"))}</select></div>
        <div class="f"><label class="lab">${esc(this.t("edEnergy"))}</label>
          <select data-k="energy">${this._opts(energies, r.energy, this.t("edNone"))}</select>
          <p class="hintline">${esc(this.t("edEnergyHint"))}</p></div>
        <div class="f"><label class="lab">${esc(this.t("edWindow"))}</label>
          <select data-k="window">${this._opts(binaries, r.window, this.t("edNone"))}</select></div>
        <div class="f"><label class="lab">${esc(this.t("edLock"))}</label>
          <select data-k="child_lock">${this._opts(locks, r.child_lock, this.t("edNone"))}</select>
          <p class="hintline">${esc(this.t("edLockHint"))}</p></div>
        <div class="f"><label class="lab">${esc(this.t("edPrimary"))}</label>
          <select data-k="primary">
            <option value=""${!r.primary ? " selected" : ""}>${esc(this.t("edPrimaryAuto"))}</option>
            <option value="climate"${r.primary === "climate" ? " selected" : ""}>${esc(this.t("edPrimaryHeat"))}</option>
            <option value="ac"${r.primary === "ac" ? " selected" : ""}>${esc(this.t("edPrimaryAc"))}</option>
          </select></div>
        <label class="lab">${esc(this.t("edPresets"))}</label>
        <div class="row">
          <div><input type="number" step="0.5" data-p="home" placeholder="${esc(this.t("edHome"))}" value="${r.presets && r.presets.home != null ? r.presets.home : ""}"></div>
          <div><input type="number" step="0.5" data-p="away" placeholder="${esc(this.t("edAway"))}" value="${r.presets && r.presets.away != null ? r.presets.away : ""}"></div>
          <div><input type="number" step="0.5" data-p="night" placeholder="${esc(this.t("edNight"))}" value="${r.presets && r.presets.night != null ? r.presets.night : ""}"></div>
        </div>
      </div>`;

    this.shadowRoot.innerHTML = `
      <style>${ED_STYLES}</style>
      <div class="sec">
        <label class="lab">${esc(this.t("edTitle"))}</label>
        <input type="text" id="title" value="${esc(c.title || "Klimat")}">
      </div>
      <div class="sec">
        <label class="lab">${esc(this.t("edLayout"))}</label>
        <select id="columns">
          <option value=""${!c.columns ? " selected" : ""}>${esc(this.t("edLayoutAuto"))}</option>
          <option value="1"${c.columns == 1 ? " selected" : ""}>${esc(this.t("edLayout1"))}</option>
          <option value="2"${c.columns == 2 ? " selected" : ""}>${esc(this.t("edLayout2"))}</option>
          <option value="3"${c.columns == 3 ? " selected" : ""}>${esc(this.t("edLayout3"))}</option>
        </select>
        <p class="hintline">${esc(this.t("edLayoutHint"))}</p>
      </div>
      <div class="sec">
        <label class="lab">${esc(this.t("edPrice"))}</label>
        <input type="number" step="0.01" min="0" id="price" value="${c.price != null ? c.price : ""}">
        <p class="hintline">${esc(this.t("edPriceHint"))}</p>
      </div>
      <div class="sec">
        <label class="lab">${esc(this.t("edOutside"))}</label>
        <select id="outside">${this._opts(weathers.concat(temps), c.outside, this.t("edOutsideNone"))}</select>
        <p class="hintline">${esc(this.t("edOutsideHint"))}</p>
      </div>
      <div class="sec">
        <label class="lab">${esc(this.t("edSeason"))}</label>
        <select id="season">${this._opts(bools, c.season_entity, this.t("edSeasonNone"))}</select>
        <p class="hintline">${esc(this.t("edSeasonHint"))}</p>
      </div>
      <div class="sec">
        <label class="lab">${esc(this.t("edRooms"))}</label>
        ${c.rooms.map(roomHtml).join("")}
        <div class="add">
          <div>
            <label class="lab">${esc(this.t("edAddArea"))}</label>
            <select id="areaPick">
              <option value="">${esc(this.t("edPickArea"))}</option>
              ${areas.map((a) => `<option value="${esc(a)}">${esc(H.areas[a].name)}</option>`).join("")}
            </select>
          </div>
          <button class="btn" id="addArea">${esc(this.t("edAdd"))}</button>
        </div>
        <p class="hintline">${esc(this.t("edAddAreaHint"))}</p>
        <button class="btn ghost" id="addEmpty" style="margin-top:10px">${esc(this.t("edAddEmpty"))}</button>
      </div>
    `;
    this._wire();
  }

  _wire() {
    const sr = this.shadowRoot;
    const c = this._config;

    sr.getElementById("title").addEventListener("input", (e) => { c.title = e.target.value; this._emit(); });
    sr.getElementById("price").addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      if (isFinite(v)) c.price = v; else delete c.price;
      this._emit();
    });
    sr.getElementById("columns").addEventListener("change", (e) => {
      if (e.target.value) c.columns = parseInt(e.target.value, 10); else delete c.columns;
      this._emit();
    });
    sr.getElementById("outside").addEventListener("change", (e) => {
      if (e.target.value) c.outside = e.target.value; else delete c.outside;
      this._emit();
    });
    sr.getElementById("season").addEventListener("change", (e) => {
      if (e.target.value) c.season_entity = e.target.value; else delete c.season_entity;
      this._emit();
    });

    sr.querySelectorAll(".room").forEach((box) => {
      const i = parseInt(box.dataset.room, 10);
      box.querySelectorAll("[data-k]").forEach((f) => {
        f.addEventListener(f.tagName === "SELECT" ? "change" : "input", () => {
          const k = f.dataset.k;
          if (f.value) c.rooms[i][k] = f.value; else delete c.rooms[i][k];
          this._emit();
        });
      });
      box.querySelectorAll("[data-p]").forEach((f) => {
        f.addEventListener("input", () => {
          c.rooms[i].presets = c.rooms[i].presets || {};
          const v = parseFloat(f.value);
          if (isFinite(v)) c.rooms[i].presets[f.dataset.p] = v;
          else delete c.rooms[i].presets[f.dataset.p];
          this._emit();
        });
      });
      box.querySelector("[data-del]").addEventListener("click", () => {
        c.rooms.splice(i, 1); this._emit(); this._render();
      });
      const move = (from, to) => {
        if (to < 0 || to >= c.rooms.length) return;
        const moved = c.rooms.splice(from, 1)[0];
        c.rooms.splice(to, 0, moved);
        this._emit(); this._render();
      };
      const up = box.querySelector("[data-up]");
      if (up) up.addEventListener("click", () => move(i, i - 1));
      const down = box.querySelector("[data-down]");
      if (down) down.addEventListener("click", () => move(i, i + 1));
    });

    sr.getElementById("addEmpty").addEventListener("click", () => {
      c.rooms.push({ name: this.t("newRoom") });
      this._ensureModes(); this._emit(); this._render();
    });

    sr.getElementById("addArea").addEventListener("click", () => {
      const aid = sr.getElementById("areaPick").value;
      if (!aid) return;
      const H = this._hass;
      const climates = entitiesInArea(H, aid, "climate");
      const sensors = entitiesInArea(H, aid, "sensor").filter((id) => isTempSensor(H, id));
      const windows = entitiesInArea(H, aid, "binary_sensor").filter((id) => {
        const st = H.states[id];
        const dc = st && st.attributes ? st.attributes.device_class : null;
        return dc === "window" || dc === "door" || dc === "opening";
      });

      let heat = null, ac = null;
      climates.forEach((id) => {
        const st = H.states[id];
        const modes = (st && st.attributes && st.attributes.hvac_modes) || [];
        if (!ac && modes.indexOf("cool") >= 0) ac = id;
        else if (!heat) heat = id;
      });

      const room = { name: H.areas[aid].name };
      if (heat) room.climate = heat;
      if (ac) room.ac = ac;
      if (sensors[0]) room.sensor = sensors[0];
      if (windows[0]) room.window = windows[0];
      room.presets = { home: 21, away: 17, night: 19 };

      c.rooms.push(room);
      this._ensureModes(); this._emit(); this._render();
    });
  }

  _ensureModes() {
    if (!this._config.modes) {
      this._config.modes = [
        { key: "home" }, { key: "away" }, { key: "night" }, { all_off: true },
      ];
    }
  }
}

if (!customElements.get("klimat-card")) customElements.define("klimat-card", KlimatCard);
if (!customElements.get("klimat-card-editor")) customElements.define("klimat-card-editor", KlimatCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "klimat-card")) {
  window.customCards.push({
    type: "klimat-card",
    name: "Klimat",
    description: "Heating and cooling — rooms, schedule, rules, history.",
    preview: false,
    documentationURL: "https://github.com/PawelekNP/klimat",
  });
}

console.info(
  `%c KLIMAT-CARD %c ${VERSION} `,
  "background:#E8833A;color:#17150F;font-weight:700",
  "background:#2a2d33;color:#fff"
);
