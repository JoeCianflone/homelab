# Pi-hole — Architecture

## Why Pi-hole exists

Goals for a dedicated DNS appliance:

- Stable, network-wide DNS
- Network-wide ad and tracker blocking
- Local hostname resolution
- A foundation for Home Assistant and future services
- Easy migration to the future VLAN architecture

A Raspberry Pi running Pi-hole was chosen over relying on the Verizon router's built-in DNS because the router offers no filtering, no query visibility, and no local DNS records.

## Current architecture

```text
                Internet
                    │
            Upstream DNS
                    │
             Verizon Router
          (DHCP Only)
                    │
            DNS -> Pi-hole
                    │
             Raspberry Pi
```

The Verizon router (CR1000B) still hands out DHCP leases, but advertises the Pi-hole's IP as the DNS server, so every device on the network resolves through Pi-hole automatically without per-device configuration.

## Decision: DHCP stays on the router (for now)

**Considered:** moving DHCP to Pi-hole as well, so it fully owns network services.

**Decided against, for now.** DHCP and DNS are separate concerns, and splitting them keeps the setup simple:

- Router → DHCP
- Pi-hole → DNS

This keeps blast radius small (if Pi-hole goes down, devices keep their leases and can be pointed elsewhere) and doesn't block migrating to Omada later. Revisit once the Omada router is in place — see [migration.md](migration.md).

## Decision: leave Laravel Herd's resolver alone

There was concern that Pi-hole's local DNS resolver would interfere with Laravel Herd (used for local development on this machine). Investigated with `dig`/`curl` — see [troubleshooting.md](troubleshooting.md#laravel-herd-dns-conflict). Herd's resolver was confirmed to be independent of the network DNS path.

**Final decision:** leave Herd exactly as installed. Changing Herd's resolver would break local development for no network benefit, since Herd only needs to resolve its own local dev domains, not the wider network.

## Future architecture

Once the Omada router/switch and VLANs are in place, Pi-hole moves onto a dedicated Servers VLAN as `DNS-01`:

```text
Internet
    │
Omada Router
    │
Servers VLAN
    │
DNS-01 (Pi-hole)
```

See [migration.md](migration.md) for the path to get there.

## Related decisions

- `docs/adr/0003-vlan-strategy.md`
- `docs/adr/0004-device-naming.md`
- `docs/adr/0005-ip-addressing.md`
