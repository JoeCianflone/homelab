# Home Assistant — Installation

Complete steps to rebuild Home Assistant OS from a bare Raspberry Pi.

## Prerequisites

- Raspberry Pi (model supported by Home Assistant OS)
- microSD card + reader
- Ethernet cable and switch/router port
- A computer with Raspberry Pi Imager to flash the SD card

## 1. Flash Home Assistant OS

Unlike Pi-hole (which runs on top of Raspberry Pi OS), Home Assistant runs its own
dedicated OS image.

Using Raspberry Pi Imager:

- Choose OS → **Other specific-purpose OS** → **Home assistants and home automation** → **Home Assistant** → select the image matching your Pi model (e.g. Home Assistant OS 32-bit for Pi 3/4/5)
- Do **not** use the generic Raspberry Pi OS image — Home Assistant OS is a full appliance image, not something installed on top of Debian
- Flash to the SD card

No SSH-enable step is needed here (unlike Pi-hole) — HAOS boots straight into its own onboarding flow.

## 2. Boot and connect

Insert the SD card, connect Ethernet, power on. First boot takes several minutes while HAOS expands the filesystem and installs the Supervisor/Core containers.

## 3. Find it on the network and complete onboarding

Home Assistant advertises itself via mDNS at the default hostname on first boot:

```
http://homeassistant.local:8123
```

If mDNS resolution doesn't work from your machine, find the IP via the router's DHCP client list or `arp -a`, same as the Pi-hole install.

Open that URL in a browser and complete the onboarding wizard (create the admin account, set location, etc).

## 4. Install the Terminal & SSH add-on

Needed for the hostname change and any future CLI work:

Settings → Add-ons → Add-on Store → install **Terminal & SSH**. Configure an SSH key or password in its Configuration tab, then start it.

Open it from the sidebar, or SSH in directly:

```bash
ssh root@homeassistant.local -p 22222
```

Note the non-standard SSH port — `22222`, not `22`. The web UI stays on `8123`.

## 5. Rename the host

Default hostname is `homeassistant.local`. Per `docs/adr/0004-device-naming.md`, rename to the song-pun hostname:

```bash
ha host options --hostname takemehomeassistant
```

Confirm:

```bash
ha host info
```

Should show `hostname: takemehomeassistant`.

Reboot to apply:

```bash
ha host reboot
```

## 6. Verify

From a client machine, once it's back up:

```bash
ping takemehomeassistant.local
```

or open `http://takemehomeassistant.local:8123`.

If the old `homeassistant.local` still resolves briefly, that's stale mDNS cache — flush it on macOS with:

```bash
sudo killall -HUP mDNSResponder
```

## 7. Update anything pointing at the old hostname

- Pi-hole Local DNS entries, if any were added for `homeassistant.local`
- Bookmarks, HomeKit bridge config, other integrations

## Post-install checklist

- [ ] Home Assistant OS flashed (not generic Raspberry Pi OS)
- [ ] Booted, onboarding wizard completed at `:8123`
- [ ] Terminal & SSH add-on installed and configured
- [ ] Hostname renamed to `takemehomeassistant.local` via `ha host options --hostname`
- [ ] Verified reachable at new hostname from a client device
- [ ] Old hostname references updated (Pi-hole Local DNS, bookmarks, etc.)
