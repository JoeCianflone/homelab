# Roadmap

## Phase 0 — Design & Core Services ✅ Done
- Architecture/planning docs and initial ADRs
- Pi-hole operational (`192.168.0.108`, `headlikeapihole.local`)
- Home Assistant operational (`192.168.0.107`, `takemehomeassistant.local`)

## Phase 1 — Omada network cutover ✅ Done
- New Omada router and access point installed
- Primary Wi-Fi operational
- Pi-hole moved to the new LAN and configured as LAN DNS
- Home Assistant moved to the new LAN
- Current service addresses verified

## Phase 2 — Wi-Fi/service organization 🚧 In progress
- `Desperado Club` — main/trusted SSID
- `Vanquisher` — guest SSID
- `Apothecary` — IoT SSID
- Recommission smart-home devices that still retain configuration from the old network
- Rebuild stale Home Assistant integrations only where necessary

## Phase 3 — Controller and management
- Continue managing current Omada devices with the present setup
- Purchase an OC200 hardware controller if/when centralized local management is desired
- Cloud Essentials was evaluated and rejected because local/privacy-preserving management is preferred

## Phase 4 — VLAN segmentation
- Finalize Main / Servers / IoT VLAN addressing
- Move core services to final static/reserved addresses if the subnet design changes
- Configure explicit mDNS/multicast handling where HomeKit/Matter/Thread discovery requires cross-VLAN access
- Apply firewall policy between trusted, IoT, guest, camera, server, and other future networks

## Phase 5 — Home Assistant device rebuild
- Remove stale old-network integration/config entries as required
- Reset/recommission Matter and other devices that cannot migrate network credentials in place
- Use Home Assistant helpers (for example Light groups) where multiple devices should expose one logical control

## Later
- Custom-domain HTTPS for internal services using publicly trusted certificates and no client-installed private CA
- Server, NAS, Docker, Plex
- Cameras and local-only camera integration
- VPN/torrent host
