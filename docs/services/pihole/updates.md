# Pi-hole — Updates

## Updating Pi-hole

```bash
pihole -up
```

Updates Pi-hole core, the web admin interface, and FTL.

## Updating the OS

```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

## Before any update

Take a manual Teleporter backup first (see [backup-and-restore.md](backup-and-restore.md#backup-strategy)) — no automated backup exists yet, so this is the only safety net.

## After any update

Re-run verification:

```bash
dig google.com
dig @127.0.0.1 google.com
curl https://www.google.com
```

Then verify from a client device on the network, not just the Pi itself (browser included — see [troubleshooting.md](troubleshooting.md#lesson-test-dns-separately-from-the-browser)).
