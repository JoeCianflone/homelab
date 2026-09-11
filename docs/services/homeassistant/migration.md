# Home Assistant Network Migration

> **Status:** ✅ Home Assistant host migrated; device recommissioning is ongoing as needed.

## Current state

- Home Assistant is operational on the current network at `192.168.0.107`.
- `takemehomeassistant.local` resolves and reaches the Home Assistant UI.
- Old integrations/devices may still need to be rebuilt or recommissioned individually.
- HTTPS with a custom domain and publicly trusted certificate is deferred for later design/implementation.

## Remaining device migration checklist

- [ ] Review **Settings → Devices & services → Integrations** for stale old-network entries.
- [ ] Reconnect/reset devices that still contain old Wi-Fi/network credentials.
- [ ] Recommission Matter devices that cannot migrate their network configuration in place.
- [ ] Rebuild dashboards/automations only where entity IDs actually change.
- [ ] Prefer helpers such as Light groups for devices that should act as one logical unit.
