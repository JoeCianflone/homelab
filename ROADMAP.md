# Roadmap

## Phase 0 — Design & Core Services ✅ Done
- Architecture/planning docs, ADRs 0001–0005
- Pi-hole operational (`headlikeapihole.local`)
- Home Assistant operational (`takemehomeassistant.local`)

## Phase 1 — Procure network hardware
- Order ER707-M2, Omada 2.5Gb switch, EAP720
- Update `HARDWARE.md` Planned → Current as items arrive

## Phase 2 — Physical cutover
- Remove Verizon CR1000B entirely (not bridge mode — fully replaced)
- ER707-M2 connects directly to the ONT as WAN
- Cable switch and AP; adopt into Omada Controller

## Phase 3 — Core network + IP addressing
- Fill in `docs/adr/0005-ip-addressing.md` with real subnets for Main (10) and Servers (20)
- Move DHCP from the (now-removed) Verizon router to the ER707-M2
- Update `docs/services/pihole/migration.md` checklist as this happens

## Phase 4 — Migrate Pi-hole + Home Assistant onto Servers VLAN
- Static IPs per the new addressing scheme
- Confirm DHCP still hands out Pi-hole as DNS
- Re-verify with `dig`/`curl`/browser per `docs/services/pihole/troubleshooting.md`

## Phase 5 — Stand up IoT VLAN (30) alongside Main/Servers
- Onboard existing Matter bulbs
- Onboard HomePod minis when purchased
- Configure explicit mDNS/multicast reflection between Main ↔ IoT for HomeKit/Matter/Thread discovery — an explicit exception to `FIREWALL.md`'s default-deny, not left implicit

## Phase 6 — Deferred VLANs (no current devices)
- Cameras (40), Guest (50), Quarantine (60), VPN (70) — revisit when an actual device or need drives each one

## Later
- Server, NAS, Docker, Plex — see `SERVICES.md` for current status of each
