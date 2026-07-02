# ADR 0004

## Original decision

Service-oriented device names: `RTR-01, SW-01, AP-01, DNS-01, HA-01, SRV-01, NAS-01`.

## Superseded

**New decision:** song-title-pun `.local` mDNS hostnames, each vaguely related to
what the device does, replacing the RTR-01/HA-01-style scheme above.

| Device | Old name | Hostname | Pun source |
| --- | --- | --- | --- |
| Pi-hole (DNS) | DNS-01 | `headlikeapihole.local` | Nine Inch Nails, "Head Like a Hole" |
| Home Assistant | HA-01 | `takemehomeassistant.local` | John Denver, "Take Me Home, Country Roads" |
| Router | RTR-01 | `routertonowhere.local` | Talking Heads, "Road to Nowhere" |
| Switch | SW-01 | `killswitchengage.local` | Killswitch Engage (band name) |
| Access Point | AP-01 | `accessradiogaga.local` | Queen, "Radio Ga Ga" |
| Server | SRV-01 | `atyourserver.local` | Motörhead, "At Your Service" |
| NAS | NAS-01 | `illmatic.local` | Nas, "Illmatic" |

Kept as an addendum rather than rewritten, per `AGENTS.md`'s "document every
significant decision" principle — the original scheme is still visible in history
above.
