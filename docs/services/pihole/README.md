# Pi-hole

> **Status:** ✅ Operational
>
> **Hostname:** `headlikeapihole.local`
>
> **Service Owner:** Infrastructure
>
> **Purpose:** Network-wide DNS filtering and local DNS resolution.

## Overview

Pi-hole is the primary DNS server for the home network. It provides network-wide ad/tracker blocking, centralized DNS resolution, local DNS records, and query logging, and is the foundation the rest of the homelab (starting with Home Assistant) will build on.

At this time **Pi-hole only provides DNS**. The Verizon router continues to provide DHCP. See [architecture.md](architecture.md) for why.

## Documents

| Doc | Purpose |
| --- | --- |
| [architecture.md](architecture.md) | Why Pi-hole exists, how it fits the network, decisions made and rejected |
| [installation.md](installation.md) | Full from-scratch install, every command run |
| [configuration.md](configuration.md) | DNS, DHCP interaction, Local DNS, upstream provider |
| [troubleshooting.md](troubleshooting.md) | Every issue hit so far and how it was diagnosed/fixed |
| [backup-and-restore.md](backup-and-restore.md) | Backup strategy (planned) and disaster recovery procedure |
| [updates.md](updates.md) | Update procedure |
| [migration.md](migration.md) | Path to the future Servers VLAN / Omada architecture |

## Hardware

| Item | Value |
| --- | --- |
| Device | Raspberry Pi |
| Operating System | Raspberry Pi OS Lite |
| Ethernet | Gigabit |
| Purpose | Dedicated DNS server |

## Current Configuration

| Setting | Value |
| --- | --- |
| DHCP | Verizon Router |
| DNS | Pi-hole |
| Local DNS | Enabled |
| Upstream DNS | Configured during install |
| DHCP Reservation | Yes |

## Related Documents

- `NETWORK.md`
- `SERVICES.md`
- `FIREWALL.md`
- `VLANS.md`
- `docs/services/homeassistant/README.md`
