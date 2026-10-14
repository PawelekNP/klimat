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
    },
}

# wersja używana do odświeżania adresu karty (omija pamięć podręczną przeglądarki)
VERSION = "1.0.0"
