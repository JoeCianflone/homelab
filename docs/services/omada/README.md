# Omada Controller

> **Status:** 🚧 Planned
>
> **Purpose:** Router/switch/AP management (ER707-M2, Omada 2.5Gb Switch, EAP720).

## Overview

Not yet deployed — see `HARDWARE.md` (Planned section). Placeholder following the [Pi-hole doc template](../pihole/README.md).

## Hostnames

| Device | Hostname |
| --- | --- |
| Router (ER707-M2) | `routertonowhere.local` |
| Switch (Omada 2.5Gb Switch) | `killswitchengage.local` |
| Access Point (EAP720) | `accessradiogaga.local` |

See `docs/adr/0004-device-naming.md` for the naming convention.

## Documents

| Doc | Purpose |
| --- | --- |
| architecture.md | Why Omada, how it replaces/augments the Verizon router |
| installation.md | Full from-scratch install |
| configuration.md | VLANs, SSIDs, firewall rules |
| troubleshooting.md | Issues hit and fixes |
| backup-and-restore.md | Backup strategy and disaster recovery |
| updates.md | Update procedure |

Fill these in as the service is actually built.

## Related Documents

- `HARDWARE.md`
- `VLANS.md`
- `docs/adr/0001-choose-omada.md`
- `docs/adr/0003-vlan-strategy.md`
