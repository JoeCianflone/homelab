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

## Documentation Site

The Markdown in this repository is available as a local VitePress site.

Install dependencies and start the development server:

```sh
pnpm install
pnpm docs:dev
```

Build and preview the production site:

```sh
pnpm docs:build
pnpm docs:preview
```

Run the documentation navigation test:

```sh
pnpm test
```
