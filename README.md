![Klimat](https://raw.githubusercontent.com/PawelekNP/klimat/main/banner.png)

Heating and cooling for Home Assistant — one panel for every room, a weekly
schedule, rules, history, and a summer/winter switch.
The whole interface follows the language set in Home Assistant (English and Polish).

![version](https://img.shields.io/badge/version-1.4.0-E8833A)
![hacs](https://img.shields.io/badge/HACS-custom%20repository-41BDF5)

## Install

One install. No copying files, no adding dashboard resources by hand —
the integration serves its own card and registers it for you.

### HACS (recommended)

1. HACS → ⋮ → **Custom repositories** → add `https://github.com/PawelekNP/klimat`,
   category **Integration**.
2. Find **Klimat**, click **Download**.
3. Restart Home Assistant.
4. **Settings → Devices & services → Add integration → Klimat**.
5. Add the **Klimat** card to any dashboard and set it up in the visual editor.

Updates arrive the same way every other HACS update does.

### Manual

Copy `custom_components/klimat` into your HA config folder (next to
`configuration.yaml`), restart, then follow steps 4–5 above.

> If your dashboard runs in YAML mode, Home Assistant will not let the integration
> add the resource itself. Add it once by hand:
> `/klimat_static/klimat-card.js` as a **JavaScript Module**.

## Card configuration

Everything is clickable in the visual editor. In YAML it looks like this:

```yaml
type: custom:klimat-card
title: Klimat
outside: weather.home              # or a plain temperature sensor
season_entity: input_boolean.summer_mode   # off = winter, on = summer
columns: 2                         # 1, 2, 3 or omit to fit the screen
modes:
  - key: home
  - key: away
  - key: night
  - all_off: true
rooms:
  - name: Living room
    climate: climate.living_room_trv    # radiator valve / thermostat
    ac: climate.living_room_ac          # air conditioning
    sensor: sensor.living_room_temp     # optional, but recommended
    window: binary_sensor.living_room_window   # optional
    primary: ""                         # "" = by season, "climate", "ac"
    presets:
      home: 21.5
      away: 17
      night: 18
```

Instead of filling this in by hand, use **Add a room from an area** in the editor —
pick an area and the card finds the valves, air conditioning and sensors assigned to it.

## How it works

**Rooms.** The temperature is set with plus and minus, or by dragging the dot along
the thermal bar. The tick on the bar is the measured temperature, the dot is the
target — so one glance tells you whether the room is above or below where it should be.

A manual change wins over the schedule **until the next block**. The tile then shows
a `manual until 22:30` badge and a **Back to schedule** button that hands control back
immediately.

If the valve has a child lock, a small padlock appears in the corner of the tile — one tap
engages or releases it. Klimat finds the lock by itself on the valve's device, so the
padlock shows up only where there is something to lock.

**Schedule.** Each room's day is a bar split into blocks, coloured by temperature —
blue is cool, orange is warm, so a week reads at a glance. Tap a block to change its
temperature, split it or remove it; drag the handles between blocks to move a boundary
in 15-minute steps. Named levels (Comfort / Eco / Night / Frost) change every block
that uses them at once.

Switch a radiator off by hand and it stays off until the current block ends — then the
schedule switches it back on, so a radiator turned off in September is not still off in
December. Rules never switch anything on. Both behaviours can be changed in **Rules**.

**Rules.** Rules take precedence over the schedule and only ever work towards saving —
they can lower a temperature, never raise it.

- *Open window pauses heating* — with a configurable delay, so letting the cat in does
  not shut the radiator down.
- *Nobody home* — when everyone listed is away, every room drops to a standby temperature.
- *Never heat and cool at once* — only one device per room, chosen by the season switch.

**Turbo.** In a room that has both a radiator and air conditioning that can heat, the
tile gets a **Turbo** button. Set a temperature and both devices heat together until the
room reaches it — then the air conditioning switches off on its own and the schedule takes
over again. This is the one exception to the never-heat-and-cool-at-once rule. If the
target turns out to be unreachable, turbo gives up after two hours rather than running all
evening.

**Underfloor heating.** Electric underfloor heating that appears in Home Assistant as a
plain switch can be assigned to a room, and Klimat becomes its thermostat. Two things make
that work. It heats *in portions* — each 20 minute cycle runs only as long as the gap to
the target warrants — so the slab never overshoots and the room stops swinging. And it
starts *early*: Klimat measures how fast each room actually warms up and works backwards
from the schedule, so a bathroom set to 23° at 06:30 is warm at 06:30, not at 07:30. The
measured rate survives restarts and gets better over the first few days. The room needs a
temperature sensor.

**Batteries.** Klimat watches the batteries of every device it relies on — valves,
temperature sensors, window sensors — and finds them by itself, with nothing to configure.
While they are charged it shows nothing at all. Once one drops below the threshold (20% by
default), a bar appears at the top of the card naming the room and the device, and the
tile itself marks it. A flat window sensor is worth catching early: stuck reporting
\u201copen\u201d, it would hold that room at the standby temperature and nobody would know why.

**Energy.** Point a room at a cumulative energy meter — a Shelly relay, a smart socket —
and the **Energy** tab breaks consumption down by room: this month, last month, and a bar
per month for the past year, so the heating season is visible at a glance. Set a price per
kWh in the card and it shows the cost too. The figures come from Home Assistant's own
statistics, the same ones behind the Energy dashboard; Klimat only groups them by room.

**History.** Measured versus target temperature per room, over 24 hours, 3 days or a week.
If the solid line never catches up with the dashed one, that radiator cannot keep up.

## Requirements

Home Assistant 2024.1 or newer. Any `climate` entity works — Zigbee valves, Better
Thermostat, generic thermostats, air conditioning.

## Licence

MIT

---

# Klimat (po polsku)

Ogrzewanie i chłodzenie w Home Assistancie — jeden panel na wszystkie pokoje,
tygodniowy harmonogram, reguły, historia i przełącznik lato/zima.
Interfejs sam dopasowuje się do języka ustawionego w Home Assistancie.

## Instalacja

Jedna instalacja. Nie trzeba kopiować plików ani ręcznie dodawać zasobu dashboardu —
integracja sama serwuje swoją kartę i sama ją rejestruje.

1. HACS → ⋮ → **Własne repozytoria** → dodaj `https://github.com/PawelekNP/klimat`,
   kategoria **Integracja**.
2. Znajdź **Klimat** i kliknij **Pobierz**.
3. Zrestartuj Home Assistanta.
4. **Ustawienia → Urządzenia i usługi → Dodaj integrację → Klimat**.
5. Dodaj kartę **Klimat** na dowolnym dashboardzie i skonfiguruj ją w edytorze graficznym.

Aktualizacje przychodzą tak samo jak wszystkie inne w HACS.

> Jeśli masz dashboard w trybie YAML, Home Assistant nie pozwoli integracji dodać
> zasobu samodzielnie. Dodaj go raz ręcznie:
> `/klimat_static/klimat-card.js`, typ **Moduł JavaScript**.

## Jak to działa

**Pokoje.** Temperaturę zmieniasz plusem i minusem albo przeciągając kropkę po pasku
termicznym. Kreska na pasku to temperatura zmierzona, kropka to zadana — widać więc
jednym spojrzeniem, czy pokój jest cieplejszy czy chłodniejszy od celu.

Ręczna zmiana wygrywa z harmonogramem **do następnego bloku**; na kafelku pojawia się
wtedy plakietka „ręcznie do 22:30" i przycisk **Wróć do harmonogramu**, który oddaje
stery od razu.

Jeśli głowica ma blokadę rodzicielską, w rogu kafelka pojawia się mała kłódka — jedno
dotknięcie zakłada ją albo zdejmuje. Klimat znajduje blokadę sam, na urządzeniu głowicy,
więc kłódka pokazuje się tylko tam, gdzie jest co blokować.

**Harmonogram.** Doba każdego pokoju to pasek podzielony na bloki. Kolor bloku to jego
temperatura: niebieski chłodno, pomarańczowy ciepło. Dotknięcie bloku pozwala zmienić
temperaturę, podzielić go na pół albo usunąć; uchwyty między blokami przeciągasz w lewo
i w prawo, skok co 15 minut. Nazwane poziomy (Komfort / Eko / Noc / Mróz) zmieniają
naraz wszystkie bloki, które z nich korzystają.

Grzejnik wyłączony ręcznie zostaje wyłączony do końca bieżącego bloku — od następnego
Klimat włącza go z powrotem, żeby zgaszony we wrześniu nie został zgaszony do grudnia.
Reguły nigdy niczego nie włączają. Jedno i drugie przestawisz w **Regułach**.

**Reguły.** Mają pierwszeństwo nad harmonogramem i zawsze działają w stronę
oszczędzania — mogą obniżyć temperaturę, nigdy jej nie podniosą: otwarte okno
(z opóźnieniem, żeby wpuszczenie kota nie gasiło grzejnika), nikogo w domu,
oraz zakaz grzania i chłodzenia naraz.

**Turbo.** W pokoju, który ma i grzejnik, i klimatyzację umiejącą grzać, na kafelku
pojawia się przycisk **Turbo**. Zadajesz temperaturę, a oba urządzenia grzeją razem,
dopóki pokój jej nie osiągnie — potem klimatyzacja gaśnie sama i wraca harmonogram.
To jedyny wyjątek od zasady, że grzejnik i klimatyzacja nigdy nie pracują naraz.
Gdyby cel okazał się nieosiągalny, turbo poddaje się po dwóch godzinach, zamiast grzać
do wieczora.

**Podłogówka.** Elektryczne ogrzewanie podłogowe, które w Home Assistancie jest zwykłym
przełącznikiem, można przypisać do pokoju — Klimat staje się wtedy jego termostatem.
Robi dwie rzeczy, bez których to nie działa. Grzeje *porcjami*: w każdym 20-minutowym
cyklu tyle, ile wynika z różnicy do celu, więc wylewka się nie przeładowuje i pokój
przestaje falować. I włącza *wcześniej*: mierzy, jak szybko dany pokój realnie się
nagrzewa, i odlicza wstecz od godziny z harmonogramu — żeby łazienka ustawiona na 23°
o 6:30 była ciepła o 6:30, a nie o 7:30. Zmierzone tempo przeżywa restart i z każdym dniem
jest celniejsze. Pokój musi mieć czujnik temperatury.

**Baterie.** Klimat pilnuje baterii we wszystkich urządzeniach, na których polega —
głowicach, czujnikach temperatury, czujnikach okien — i znajduje je sam, bez
konfigurowania czegokolwiek. Dopóki są naładowane, nie pokazuje nic. Gdy któraś spadnie
poniżej progu (domyślnie 20%), na górze karty pojawia się pasek z nazwą pokoju
i urządzenia, a kafelek to zaznacza. Zwłaszcza padnięty czujnik okna warto złapać wcześnie:
zacięty na „otwarte" trzymałby pokój na temperaturze postojowej i nikt by nie wiedział dlaczego.

**Zużycie.** Wskaż pokojowi licznik energii — przekaźnik Shelly, gniazdko z pomiarem —
a zakładka **Zużycie** pokaże rozbicie na pokoje: ten miesiąc, poprzedni i słupek na każdy
miesiąc z ostatniego roku, więc sezon grzewczy widać jednym spojrzeniem. Po wpisaniu ceny
za kWh dolicza koszt. Liczby pochodzą ze statystyk Home Assistanta, tych samych, na których
stoi panel Energia — Klimat tylko grupuje je po pokojach.

**Historia.** Temperatura zmierzona kontra zadana, dla każdego pokoju, z 24 godzin,
3 dni albo tygodnia. Jeśli linia ciągła nigdy nie dogania przerywanej, grzejnik
w tym pokoju nie wyrabia.

## Licencja

MIT
