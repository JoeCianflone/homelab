# Pi-hole — Configuration

## Router DHCP handoff

The Verizon router continues to hand out DHCP leases. It advertises the Pi-hole's IP as the network's DNS server, so every device gets Pi-hole automatically via DHCP — no per-device configuration needed.

Router: DHCP only.
Pi-hole: DNS only.

Why this split: see [architecture.md](architecture.md#decision-dhcp-stays-on-the-router-for-now).

## DHCP reservation

A static DHCP reservation was created on the router for the Pi's MAC address, so its IP never changes. Infrastructure devices (DNS, Home Assistant, NAS, servers) should always get reserved addresses — a moving DNS server IP would break every client's DHCP-assigned DNS setting until leases renew.

## Upstream DNS

Selected during the Pi-hole installer's interactive prompts (choice of upstream provider, e.g. Cloudflare/Google/Quad9/custom). Recorded as "configured during install" — if you don't remember which was picked, check `/etc/pihole/pihole-FTL.conf` or Settings → DNS in the Pi-hole admin UI on the live system before it's rebuilt.

## Local DNS

Enabled. Lets you assign hostnames to devices on the local network (e.g. `homeassistant.home`) that resolve only within the LAN, resolved by Pi-hole rather than sent upstream.

## Why the resolver shows 127.0.0.1

On the Pi itself, the system resolver points at `127.0.0.1`. This is expected — Pi-hole runs its own resolver (FTL) locally on the Pi and answers queries from there rather than forwarding every query externally first.

## Laravel Herd interaction

Herd's local DNS resolver was left untouched. It only needs to resolve Herd's own local development domains and does not need to route through Pi-hole. Changing it would have broken local development for no benefit. Full investigation: [troubleshooting.md](troubleshooting.md#laravel-herd-dns-conflict).

## Verification

DNS queries:

```bash
dig google.com
```

Verify the local resolver directly:

```bash
dig @127.0.0.1 google.com
```

HTTP connectivity (confirms DNS resolution end-to-end, not just the `dig` protocol path):

```bash
curl https://www.google.com
```

**Test in this order** — `dig`, then `curl`, then browser. See [troubleshooting.md](troubleshooting.md#lesson-test-dns-separately-from-the-browser) for why browser-only testing is misleading.

## Current configuration snapshot

| Setting | Value |
| --- | --- |
| DHCP | Verizon Router |
| DNS | Pi-hole |
| Local DNS | Enabled |
| Upstream DNS | Configured during install (see above) |
| DHCP Reservation | Yes |

## Monitoring

Review regularly in the Pi-hole admin UI / via CLI:

- Query log
- Block statistics
- Upstream health
- Disk usage
- CPU usage
- Temperature
