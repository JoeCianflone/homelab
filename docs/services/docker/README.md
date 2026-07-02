# Docker

> **Status:** 🚧 Planned
>
> **Hostname (server):** `atyourserver.local` *(see note below)*
>
> **Purpose:** Container host for self-hosted services.

## Overview

Not yet deployed. Placeholder following the [Pi-hole doc template](../pihole/README.md).

**Note:** `AGENTS.md`/`docs/adr/0004-device-naming.md` list a separate "Server"
device (`atyourserver.local`) distinct from "NAS". There's no dedicated
`docs/services/server/` doc set yet — the hostname is recorded here against the
Docker host for now. If the server ends up being a distinct physical device from
the Docker host, split this into its own `docs/services/server/` doc set.

## Documents

| Doc | Purpose |
| --- | --- |
| architecture.md | Why Docker, what runs on it, how it fits the network |
| installation.md | Full from-scratch install |
| configuration.md | Compose files, networks, volumes |
| troubleshooting.md | Issues hit and fixes |
| backup-and-restore.md | Volume backup strategy and disaster recovery |
| updates.md | Update procedure |

Fill these in as the service is actually built.
