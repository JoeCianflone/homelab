# Pi-hole — Migration

## Current state

Pi-hole runs directly on the flat home network, behind the Verizon router, providing DNS only. See [architecture.md](architecture.md#current-architecture).

## Target state

Once the Omada router/switch (ER707-M2, Omada 2.5Gb Switch) is deployed and VLANs are configured (`docs/adr/0003-vlan-strategy.md`), Pi-hole moves to a dedicated Servers VLAN, keeping its hostname `headlikeapihole.local` (`docs/adr/0004-device-naming.md`, `docs/adr/0005-ip-addressing.md`):

```text
Internet
    │
Omada Router
    │
Servers VLAN
    │
headlikeapihole.local (Pi-hole)
```

## Migration checklist (future work)

- [ ] Deploy Omada router and switch
- [ ] Configure VLANs, including a Servers VLAN
- [ ] Assign Pi-hole a static IP within the Servers VLAN per `docs/adr/0005-ip-addressing.md`
- [ ] Confirm `headlikeapihole.local` still resolves after the move (mDNS hostname, no rename needed — see `docs/adr/0004-device-naming.md`)
- [ ] Re-point DHCP (now likely on Omada) to the new Pi-hole address
- [ ] Re-verify with `dig`, `curl`, and browser from a client on each VLAN that should reach DNS
- [ ] Update this doc set and `SERVICES.md` to reflect the new architecture as current

## Other planned improvements (not VLAN-related)

- Automatic backups (see [backup-and-restore.md](backup-and-restore.md))
- Integrate with Home Assistant
- Monitoring (query log, block stats, upstream health, disk/CPU/temp — see [configuration.md](configuration.md#monitoring))
- Gravity Sync, if a secondary Pi-hole is added for redundancy
- High availability (further out)
