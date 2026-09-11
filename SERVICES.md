# Services

Pi-hole, Home Assistant, Omada networking, Plex, Docker, and NAS.

Full documentation for each service lives under `docs/services/<service>/`. This file stays a short current-state index.

- [docs/services/pihole/](docs/services/pihole/README.md) ✅ Operational
- [docs/services/homeassistant/](docs/services/homeassistant/README.md) ✅ Operational
- [docs/services/omada/](docs/services/omada/README.md) ✅ Core network operational; dedicated hardware controller deferred
- [docs/services/plex/](docs/services/plex/README.md) 🚧 Planned / migration work
- [docs/services/docker/](docs/services/docker/README.md) 🚧 Planned
- [docs/services/nas/](docs/services/nas/README.md) 🚧 Planned

---

# Pi-hole

> **Status:** ✅ Operational
>
> **Hostname:** `headlikeapihole.local`
>
> **IPv4:** `192.168.0.108`
>
> **Purpose:** Network-wide DNS filtering and local DNS resolution.

Pi-hole is the primary DNS server for the home network. The current router advertises Pi-hole (`192.168.0.108`) as LAN DNS. Query resolution through Pi-hole has been verified after the network cutover.

Full documentation: 👉 **[docs/services/pihole/](docs/services/pihole/README.md)**

---

# Home Assistant

> **Status:** ✅ Operational
>
> **Hostname:** `takemehomeassistant.local`
>
> **IPv4:** `192.168.0.107`
>
> **Purpose:** Home automation platform.

Runs on Home Assistant OS on a dedicated Raspberry Pi. Reachable at `http://takemehomeassistant.local:8123` or `http://192.168.0.107:8123`.

The host is fully moved to the current network. Individual smart devices may still require cleanup/recommissioning from the old network. HTTPS with a custom domain is deferred.

Full documentation: 👉 **[docs/services/homeassistant/](docs/services/homeassistant/README.md)**
