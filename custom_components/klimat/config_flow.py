"""Kreator dodania dodatku Klimat (jedno kliknięcie, bez pytań)."""

from __future__ import annotations

from homeassistant.config_entries import ConfigFlow

from .const import DOMAIN


class KlimatConfigFlow(ConfigFlow, domain=DOMAIN):
    """Dodatek nie wymaga żadnych danych — wystarczy go dodać."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        if user_input is None:
            return self.async_show_form(step_id="user")
        return self.async_create_entry(title="Klimat", data={})
