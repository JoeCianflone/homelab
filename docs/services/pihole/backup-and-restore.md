# Pi-hole — Backup and Restore

## Backup strategy

**Not yet implemented.** Planned:

- Export Pi-hole configuration (`pihole -a -t` / Settings → Teleporter in the admin UI)
- Backup the gravity database (blocklists, groups, clients)
- Backup Local DNS records
- Snapshot the SD card before OS/Pi-hole upgrades

Until automated backups exist, take a manual Teleporter export before any risky change (OS upgrade, Pi-hole major version upgrade, hardware move).

## Disaster recovery procedure

If the SD card fails or the Pi is otherwise lost:

1. Flash Raspberry Pi OS Lite — see [installation.md](installation.md#1-install-raspberry-pi-os-lite)
2. Enable SSH
3. Install Pi-hole — see [installation.md](installation.md#4-install-pi-hole)
4. Restore from the most recent backup (once backups exist; until then, reconfigure manually per [configuration.md](configuration.md))
5. Verify DNS:

   ```bash
   dig google.com
   curl https://www.google.com
   ```

6. Confirm the DHCP reservation still points to the Pi's (possibly new) MAC address — update the reservation if the hardware changed
7. Test from a client device, not just the Pi itself

**Expected downtime:** less than 30 minutes.

## Related

- [installation.md](installation.md)
- [configuration.md](configuration.md)
