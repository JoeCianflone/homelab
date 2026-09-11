# Pi-hole

> **Status:** ✅ Operational
>
> **Hostname:** `headlikeapihole.local`
>
> **IPv4:** `192.168.0.108`
>
> **Purpose:** Network-wide DNS filtering and local DNS resolution.

## Overview

Pi-hole runs on a dedicated Raspberry Pi and is the LAN DNS server. The current Omada-based router/network advertises `192.168.0.108` as DNS to clients. DNS resolution through Pi-hole has been verified since the network cutover.

Pi-hole provides DNS only; DHCP is provided by the current router/network infrastructure.

## Current state

| Function | Provider |
| --- | --- |
| DNS filtering | Pi-hole |
| Local DNS | Pi-hole |
| DHCP | Current Omada-based router/network |
| Pi-hole address | `192.168.0.108` |

## Documents

| Doc | Purpose |
| --- | --- |
| [architecture.md](architecture.md) | Current and historical architecture |
| [installation.md](installation.md) | Installation notes |
| [configuration.md](configuration.md) | DNS/DHCP handoff and resolver configuration |
| [troubleshooting.md](troubleshooting.md) | Troubleshooting history |
| [backup-and-restore.md](backup-and-restore.md) | Backup and restore |
| [updates.md](updates.md) | Update procedure |
| [migration.md](migration.md) | Migration status and future VLAN move |
