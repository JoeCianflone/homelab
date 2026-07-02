# Services

Pi-hole, Home Assistant, Omada Controller, Plex, Docker, NAS.

Full documentation for each service (architecture, installation, configuration,
troubleshooting, backup-and-restore, updates, migration) lives under
`docs/services/<service>/`. This file stays a short current-state index; do not let
it drift back into a full guide.

- [docs/services/pihole/](docs/services/pihole/README.md) ✅ Operational
- [docs/services/homeassistant/](docs/services/homeassistant/README.md) 🚧 Planned
- [docs/services/omada/](docs/services/omada/README.md) 🚧 Planned
- [docs/services/plex/](docs/services/plex/README.md) 🚧 Planned
- [docs/services/docker/](docs/services/docker/README.md) 🚧 Planned
- [docs/services/nas/](docs/services/nas/README.md) 🚧 Planned

---

# Pi-hole

> **Status:** ✅ Operational
>
> **Hostname:** `headlikeapihole.local`
>
> **Service Owner:** Infrastructure
>
> **Purpose:** Network-wide DNS filtering and local DNS resolution.

Pi-hole is the primary DNS server for the home network. DHCP stays on the Verizon
router; Pi-hole handles DNS only (network-wide ad/tracker blocking, local DNS
records, query logging).

Full architecture, install steps, configuration, troubleshooting history,
backup/restore, updates, and migration plan:
👉 **[docs/services/pihole/](docs/services/pihole/README.md)**