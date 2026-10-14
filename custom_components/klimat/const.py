"""Stałe dodatku Klimat."""

DOMAIN = "klimat"
STORAGE_KEY = "klimat.config"
STORAGE_VERSION = 1

# co ile sekund sprawdzamy, czy trzeba zmienić temperaturę
TICK_SECONDS = 60

DEFAULT_LEVELS = [
    {"key": "komfort", "name": "Komfort", "t": 21.5},
    {"key": "eko", "name": "Eko", "t": 19.0},
    {"key": "noc", "name": "Noc", "t": 18.0},
    {"key": "mroz", "name": "Mróz", "t": 16.0},
]

DEFAULT_DATA = {
    "enabled": True,
    "season_entity": None,
    "levels": DEFAULT_LEVELS,
    "rooms": [],
    "rules": {
        # otwarte okno wstrzymuje grzanie w tym pokoju
        "window_open": {"enabled": True, "temp": 16, "delay_min": 2},
        # nikogo w domu — schodzimy do temperatury postojowej
        "away": {"enabled": False, "temp": 17, "persons": []},
        # w jednym pokoju pracuje tylko jedno urządzenie
        "no_conflict": {"enabled": True},
        # harmonogram może włączyć urządzenie wyłączone ręcznie — ale dopiero
        # od następnego bloku, nigdy w trakcie tego, w którym je zgaszono
        "wake_devices": {"enabled": True},
    },
}

# wersja używana do odświeżania adresu karty (omija pamięć podręczną przeglądarki)
VERSION = "1.3.0"

# po tylu minutach turbo gasi się samo, choćby cel był nieosiągalny
TURBO_MAX_MIN = 120

# ---------- ogrzewanie podłogowe ----------
# Podłogówka ma bezwładność liczoną w godzinach, więc nie gonimy temperatury
# włącz/wyłącz, tylko grzejemy porcjami: w każdym cyklu tyle, ile wynika
# z różnicy do celu. Dzięki temu płyta się nie przeładowuje.
FLOOR_CYCLE_MIN = 20       # długość cyklu w minutach
FLOOR_SPAN = 1.5           # przy takiej różnicy grzejemy pełną porcją
FLOOR_MIN_ON_MIN = 3       # krótszych załączeń nie ma sensu robić
FLOOR_DEFAULT_RATE = 0.8   # °C na godzinę, zanim Klimat zmierzy własną wartość
FLOOR_MAX_LEAD_MIN = 180   # najdalsze wyprzedzenie, jakie dopuszczamy
LEARN_STORAGE_KEY = "klimat.learn"
