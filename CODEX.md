# Homelab Codex Project Context

## Mission

This repository is the single source of truth for my entire homelab.

The long-term goal is that if every piece of hardware were lost, I could rebuild the entire homelab from this repository and backups with minimal manual work.

Documentation is important, but this repository should evolve into an Infrastructure-as-Code repository rather than simply a documentation repository.

When making changes, prefer automation over manual steps.

---

# Project Goals

The homelab should be:

* Reproducible
* Documented
* Version controlled
* Self-hosted
* Easily recoverable
* Easy to understand six months from now
* Built using industry best practices

---

# Philosophy

Every change should satisfy at least one of these goals:

* Reduce manual work
* Improve documentation
* Increase reproducibility
* Improve disaster recovery
* Improve security
* Reduce configuration drift

Avoid changes that only make the repository larger without providing long-term value.

---

# Documentation Standards

Documentation is a first-class citizen.

Every significant service should eventually contain:

* Architecture
* Installation
* Configuration
* Updates
* Backups
* Troubleshooting
* Migration (when applicable)

Documentation should explain *why*, not just *how*.

---

# Preferred Pull Request Size

Prefer small pull requests.

Each PR should focus on a single concern.

Good examples:

* Introduce Docker layout
* Add bootstrap scripts
* Add monitoring
* Add backup automation

Avoid large "everything" PRs.

---

# Repository Evolution

The repository should gradually evolve into:

/
├── docs/
├── infrastructure/
│   ├── docker/
│   ├── proxmox/
│   ├── ansible/
│   ├── cloud-init/
│   ├── terraform/
│   └── scripts/
├── configs/
├── backups/
└── templates/

Infrastructure should eventually contain everything required to recreate the homelab.

---

# Infrastructure Philosophy

Infrastructure should be declarative whenever practical.

Prefer:

Cloud-init

↓

Ansible

↓

Docker Compose

↓

Application configuration

rather than manually configuring servers.

---

# Services

Current services include (and will continue to expand):

* Pi-hole
* Home Assistant
* Docker
* Plex
* Omada Controller

Future services may include:

* Traefik
* Uptime Kuma
* Grafana
* Prometheus
* Paperless-ngx
* Immich
* Homepage
* Vaultwarden

---

# Coding Standards

When writing scripts:

* Bash should be POSIX-compatible unless Bash-specific features are required.
* Shell scripts should use `set -euo pipefail`.
* Prefer idempotent operations.
* Avoid interactive prompts when automation is expected.

When writing Docker Compose:

* Use Compose Specification.
* One directory per service.
* Include README.md.
* Include `.env.example`.
* Keep secrets outside Git.

---

# Security

Never commit:

* Passwords
* API keys
* Certificates
* Private keys
* Secrets

Always use placeholder values.

Document where secrets belong.

---

# Documentation Style

Write for Future Me.

Assume I have forgotten everything.

Explain:

* Why
* Tradeoffs
* Recovery process
* Maintenance

not merely installation commands.

---

# Architecture Decisions

Major design decisions should be documented using Architecture Decision Records (ADRs).

If a change significantly affects architecture, recommend creating or updating an ADR.

---

# Expectations for Codex

When asked to implement work:

* Review the repository before making changes.
* Follow existing organization and naming conventions.
* Prefer extending current patterns over introducing new ones.
* Keep changes focused.
* Update documentation whenever behavior changes.
* Explain tradeoffs.
* Suggest follow-up PRs instead of implementing unrelated improvements.

Think like a senior infrastructure engineer performing a code review, not an autocomplete engine.
