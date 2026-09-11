# Omada Network

> **Status:** ✅ Core network operational
>
> **Purpose:** Router, switch, access-point, SSID, and future VLAN management.

## Overview

The Omada-based network has replaced the previous Verizon-router-centric setup. The router and access point are operational and the new Wi-Fi networks are in service.

A dedicated OC200 hardware controller is being considered for future centralized local management. Omada Cloud Essentials was evaluated and rejected because local/privacy-preserving management is preferred.

## Current names

| Role | Name |
| --- | --- |
| Router | Dungeon World |
| Switch | Scolopendra |
| Access point | Gate of the Feral Gods |
| Controller | The Syndicate |

## SSIDs

| SSID | Purpose |
| --- | --- |
| `Desperado Club` | Main/trusted |
| `Vanquisher` | Guest |
| `Apothecary` | IoT |

## Current service addressing

The current flat LAN is `192.168.0.0/24` while final VLAN segmentation is still in progress.

- Home Assistant: `192.168.0.107`
- Pi-hole / LAN DNS: `192.168.0.108`

## Next work

- Continue recommissioning IoT/Home Assistant devices from the old network.
- Finalize VLAN addressing and firewall policy.
- Configure mDNS/multicast behavior required by HomeKit/Matter/Thread across VLANs.
- Add an OC200 if centralized local controller management is desired.

## Related Documents

- `NETWORK.md`
- `VLANS.md`
- `FIREWALL.md`
- `ROADMAP.md`
- `docs/adr/0001-choose-omada.md`
- `docs/adr/0003-vlan-strategy.md`
- `docs/adr/0004-device-naming.md`
