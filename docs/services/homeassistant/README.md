# Home Assistant

> **Status:** ✅ Operational
>
> **Hostname:** `takemehomeassistant.local`
>
> **IPv4:** `192.168.0.107`
>
> **Purpose:** Home automation platform.

## Overview

Runs on Home Assistant OS on a dedicated Raspberry Pi (see `HARDWARE.md`). It is operational on the current network and reachable at `http://takemehomeassistant.local:8123` or `http://192.168.0.107:8123`. SSH is available through the Terminal & SSH add-on on port `22222` when enabled.

The Home Assistant host migration is complete. Some smart-home devices and integrations may still require cleanup or recommissioning because they were originally configured on the previous network.

HTTPS using a personally owned domain and a publicly trusted certificate is planned but intentionally deferred.

## Documents

| Doc | Purpose |
| --- | --- |
| [installation.md](installation.md) | Full from-scratch install |
| [configuration.md](configuration.md) | Current network state, integrations, device migration, groups |
| [troubleshooting.md](troubleshooting.md) | Issues encountered and recovery steps |
| [migration.md](migration.md) | Current migration status and remaining device work |

## Recent configuration notes

- Home Assistant: `192.168.0.107`
- Local hostname: `takemehomeassistant.local`
- Two or more lights that should share one brightness control should be combined with a **Light group** helper under **Settings → Devices & services → Helpers**.
- Individual lights remain independently controllable after being added to a Light group.

## Related Documents

- `SERVICES.md`
- `NETWORK.md`
- `docs/services/pihole/README.md`
