# Pi-hole — Troubleshooting

Issues actually encountered while standing this up, how they were diagnosed, and what was decided. Kept in narrative form on purpose — the reasoning is as valuable as the fix.

## Finding the Pi on the network

**Symptom:** freshly flashed Pi powered on, no known IP to SSH into.

**Fix:**

```bash
arp -a
```

Scan the output for the Raspberry Pi's MAC prefix, or check the router's DHCP client list.

## DNS resolved via `dig` but browsers failed

**Symptom:** `dig` returned correct results, but browsers could not load pages.

**Investigation:** the issue traced back to local resolver configuration on the client — `dig` and browsers don't always exercise the same resolution path, so a passing `dig` doesn't guarantee a working browser.

**Resolution:** corrected the DNS configuration on the affected client; verified with `dig`, then `curl`, then the browser in that order (see the lesson below).

## Browser could not resolve names ("Server not found")

**Symptom:**

- Firefox: "Server not found"
- curl: "Could not resolve host"

**Troubleshooting commands used:**

```bash
dig
curl
arp -a
ip addr
```

**Resolution:** DNS configuration was corrected once the layers were checked independently (network reachability → resolver config → application-level resolution).

## Localhost resolver shows 127.0.0.1

**Observed:** on the Pi, the resolver is `127.0.0.1`.

**Not a bug.** Pi-hole runs its own resolver (FTL) locally on the Pi and answers from there. Documented in [configuration.md](configuration.md#why-the-resolver-shows-127001).

## Laravel Herd DNS conflict

**Concern raised:** installing Pi-hole might interfere with Laravel Herd's local DNS resolver on the development machine, breaking local `.test` domain resolution.

**Investigation:** used `dig` and `curl` to check whether Herd's resolver path overlapped with the network DNS path Pi-hole now controls.

**Finding:** Herd's resolver should remain untouched — it resolves its own local dev domains independently and isn't part of the network-wide DNS chain Pi-hole sits in.

**Decision:** leave Herd exactly as installed. Changing it would break local development with no upside, since Herd doesn't need to go through Pi-hole.

## Lesson: test DNS separately from the browser

Do not rely on browser behavior alone to validate DNS — browsers cache aggressively and have their own resolution quirks (DoH, etc.) that can mask or mimic DNS issues.

Always verify in this order:

1. `dig` — confirms DNS protocol-level resolution
2. `curl` — confirms resolution *and* connectivity
3. Browser — last, since it's the least isolated signal

## Lesson: DHCP and DNS are separate concerns

Keeping them split (router = DHCP, Pi-hole = DNS) made debugging easier — a DNS issue could be isolated without wondering whether DHCP leases were also affected. See [architecture.md](architecture.md#decision-dhcp-stays-on-the-router-for-now).

## Lesson: static reservations prevent a whole class of outages

Infrastructure devices (DNS, Home Assistant, NAS, servers) should always get a reserved DHCP address. Without one, an IP change on the DNS server would silently break every client until their leases renew and they get pointed elsewhere — a hard failure mode to diagnose after the fact.
