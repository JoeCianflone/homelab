# Pi-hole — Installation

Complete steps to rebuild Pi-hole from a bare Raspberry Pi. Follow in order.

## Prerequisites

- Raspberry Pi (any model capable of running Raspberry Pi OS Lite)
- microSD card + reader
- Ethernet cable and switch/router port
- A computer to flash the SD card and SSH in from

## 1. Install Raspberry Pi OS Lite

Flash Raspberry Pi OS Lite to the SD card using Raspberry Pi Imager (or equivalent).

**Enable SSH before first boot** (via Imager's advanced options, or by dropping an empty `ssh` file in the boot partition). Without this you cannot headlessly access the Pi.

## 2. Connect to the network

Connect the Pi via Ethernet (not Wi-Fi — this is a dedicated DNS appliance, wired is more reliable) and power it on.

Find the Pi's IP address on the network:

```bash
arp -a
```

Look for the Raspberry Pi Foundation MAC prefix in the output, or check the router's DHCP client list.

## 3. Connect via SSH

```bash
ssh pi@<ip-address>
```

## 4. Install Pi-hole

Run the official installer:

```bash
curl -sSL https://install.pi-hole.net | bash
```

During the interactive installer:

- Accept the default web interface
- Install `lighttpd`
- Install FTL
- Select an upstream DNS provider (see [configuration.md](configuration.md#upstream-dns) for what/why)

Note the admin password shown at the end of install (or set one with `pihole -a -p`).

## 5. Configure the router for DHCP + DNS handoff

The Verizon router keeps handling DHCP. Point it at Pi-hole for DNS so every device on the network picks it up automatically — see [configuration.md](configuration.md#router-dhcp-handoff).

## 6. Create a static DHCP reservation

Reserve the Pi's IP in the router's DHCP settings so the DNS server's address never changes. See [configuration.md](configuration.md#dhcp-reservation).

## 7. Verify

```bash
dig google.com
dig @127.0.0.1 google.com
curl https://www.google.com
```

Full verification procedure and expected output: [configuration.md](configuration.md#verification).

## Post-install checklist

- [ ] Raspberry Pi OS Lite flashed, SSH enabled
- [ ] Pi discovered on network, SSH access confirmed
- [ ] Pi-hole installed, admin password set
- [ ] Router DNS pointed at Pi-hole
- [ ] Static DHCP reservation created for the Pi
- [ ] `dig` and `curl` verified from a client device
- [ ] Browser verified from a client device (not just `dig`/`curl` — see [troubleshooting.md](troubleshooting.md))
