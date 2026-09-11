# Pi-hole Migration

> **Status:** ✅ Migrated to the current Omada-based LAN; future Servers VLAN move remains open.

## Current state

- Pi-hole address: `192.168.0.108`
- Hostname: `headlikeapihole.local`
- LAN DNS advertisement has been updated to point clients at Pi-hole.
- DNS resolution has been verified after the network cutover.

## Completed

- [x] Move Pi-hole onto the current network
- [x] Identify its current address (`192.168.0.108`)
- [x] Configure LAN DNS to use Pi-hole
- [x] Verify name resolution from clients

## Future Servers VLAN migration

- [ ] Finalize Servers VLAN/subnet design
- [ ] Reserve/assign Pi-hole's final address
- [ ] Update DHCP/LAN DNS advertisement
- [ ] Add firewall rules allowing required clients/VLANs to reach DNS on TCP/UDP 53
- [ ] Re-verify DNS from each permitted VLAN
- [ ] Update service docs with the new address
