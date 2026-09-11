# AGENTS

## Principles
- Architecture first.
- Document every significant decision.
- Prefer modular, replaceable components.
- Keep documentation synchronized with implementation.
- Favor incremental changes.

## Naming
Infrastructure names currently use a Dungeon Crawler Carl theme. Preserve historical naming decisions in `docs/adr/0004-device-naming.md`; do not silently rewrite history.

| Role | Current name |
| --- | --- |
| Router | Dungeon World |
| Switch | Scolopendra |
| Access Point | Gate of the Feral Gods |
| Controller | The Syndicate |
| Media Server | Sensation Entertainment |
| NAS | Larracos |
| Cameras | Orren |
| VPN | Snicks |

SSIDs: `Desperado Club` (main), `Vanquisher` (guest), `Apothecary` (IoT).

Pi-hole and Home Assistant currently retain `headlikeapihole.local` and `takemehomeassistant.local`.
