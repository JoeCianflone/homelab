# Home Assistant

> **Status:** ✅ Operational
>
> **Hostname:** `takemehomeassistant.local`
>
> **Purpose:** Home automation platform.

## Overview

Runs on Home Assistant OS on a dedicated Raspberry Pi (see `HARDWARE.md`). Installed and reachable at `http://takemehomeassistant.local:8123`; SSH via the Terminal & SSH add-on on port `22222`.

## Documents

| Doc | Purpose |
| --- | --- |
| architecture.md | Why Home Assistant exists, how it fits the network |
| installation.md | Full from-scratch install |
| configuration.md | Integrations, automations, entities |
| troubleshooting.md | Issues hit and fixes |
| backup-and-restore.md | Backup strategy and disaster recovery |
| updates.md | Update procedure |
| migration.md | Path to future VLAN placement |

Fill these in as the service is actually built — see [docs/services/pihole/](../pihole/) for the level of detail expected.

## Related Documents

- `SERVICES.md`
- `docs/services/pihole/README.md`
