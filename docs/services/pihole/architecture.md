# Pi-hole Architecture

## Current architecture

Pi-hole runs on a Raspberry Pi at `192.168.0.108` and provides DNS for the current Omada-based LAN.

```text
Internet
   |
Omada-based router/network
   |-- DHCP / routing / firewall
   |-- advertises DNS: 192.168.0.108
   |
Pi-hole (192.168.0.108)
   |-- DNS filtering
   |-- local DNS
   |-- query visibility
   |
LAN clients
```

Keeping DHCP on the network infrastructure and DNS on Pi-hole avoids making Pi-hole responsible for address assignment while preserving network-wide filtering and visibility.

## Historical architecture

Before the Omada cutover, the Verizon CR1000B provided DHCP and advertised Pi-hole as DNS. That arrangement is no longer current but is retained here as migration history.

## Future architecture

When VLAN segmentation is finalized, Pi-hole may move to a dedicated Servers VLAN. If its address changes, update DHCP/DNS advertisement, firewall rules, monitoring, and the documentation together.
