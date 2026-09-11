# Pi-hole Configuration

## Current network handoff

Pi-hole is the network DNS server at `192.168.0.108`. DHCP remains on the router/network infrastructure, which advertises Pi-hole as LAN DNS so clients receive it automatically.

This keeps responsibilities separated:

- Router/network: DHCP, routing, firewalling, VLANs
- Pi-hole: DNS filtering, local DNS, query visibility

## Client verification

From a client, verify DNS resolution and confirm the resolver is Pi-hole. Useful commands include:

```sh
dig google.com
scutil --dns
```

The exact client output varies, but the effective LAN DNS should ultimately route through `192.168.0.108`.

## Local DNS

Local names can be maintained in Pi-hole where appropriate. `.local` hostnames such as `headlikeapihole.local` and `takemehomeassistant.local` also rely on mDNS behavior and should not be assumed to be ordinary unicast DNS records.

## Current summary

| Setting | Value |
| --- | --- |
| Pi-hole IPv4 | `192.168.0.108` |
| DHCP provider | Current router/network |
| Pi-hole DHCP | Disabled |
| Role | Primary LAN DNS |
