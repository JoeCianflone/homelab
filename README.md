# Homelab

A version-controlled homelab built with the same engineering discipline as a software project.

## Vision
- Secure, segmented network
- Self-hosted infrastructure
- Reproducible configuration
- Living documentation
- Local-first management where practical

## Project Status

**Omada cutover complete; service migration and segmentation in progress.** See `ROADMAP.md`.

Current core services:

- Home Assistant — `192.168.0.107` / `takemehomeassistant.local`
- Pi-hole — `192.168.0.108` / `headlikeapihole.local`
- Main SSID — `Desperado Club`
- Guest SSID — `Vanquisher`
- IoT SSID — `Apothecary`

## Documents
- `ARCHITECTURE.md`
- `NETWORK.md`
- `VLANS.md`
- `FIREWALL.md`
- `HARDWARE.md`
- `SERVICES.md` — service index; full per-service docs live under `docs/services/<service>/`

## Roadmap

See `ROADMAP.md` for the current migration, controller, VLAN, Home Assistant, HTTPS, and future-service work.
