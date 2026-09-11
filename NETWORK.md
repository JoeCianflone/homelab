# Network

Physical and logical topology for the current homelab network.

## Current state

The network has been cut over from the previous Verizon-router-based setup to the Omada-based network. The router and access point are operational. A dedicated OC200 hardware controller is a possible future purchase; cloud management was evaluated and rejected because of privacy preferences.

Core services currently use the `192.168.0.0/24` LAN while the final VLAN design is still being rolled out.

| Service | Address | Name |
| --- | --- | --- |
| Home Assistant | `192.168.0.107` | `takemehomeassistant.local` |
| Pi-hole | `192.168.0.108` | `headlikeapihole.local` |

Pi-hole is configured as LAN DNS and has been verified from clients.

## Wi-Fi

Current SSIDs use the Dungeon Crawler Carl naming scheme:

| SSID | Purpose |
| --- | --- |
| `Desperado Club` | Main/trusted network |
| `Vanquisher` | Guest network |
| `Apothecary` | IoT network |

## Device names

| Role | Name |
| --- | --- |
| Router | Dungeon World |
| Switch | Scolopendra |
| Access point | Gate of the Feral Gods |
| Controller | The Syndicate |
| Media server | Sensation Entertainment |
| NAS | Larracos |
| Cameras | Orren |
| VPN | Snicks |

The legacy song-pun `.local` names remain in use for Pi-hole and Home Assistant until/unless they are deliberately renamed.

## Notes

- Home Assistant is operational at `192.168.0.107`.
- Pi-hole is operational at `192.168.0.108` and is the LAN DNS server.
- Custom-domain HTTPS for internal services is planned but deferred. The desired solution should use a publicly trusted certificate and should not require installing a private CA/root certificate on clients.
- Smart-home devices from the previous network are being recommissioned as needed.
