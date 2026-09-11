# Home Assistant Configuration

Current Home Assistant configuration and operating notes.

## Network

- Home Assistant OS runs on a dedicated Raspberry Pi.
- Current IPv4 address: `192.168.0.107`.
- mDNS hostname: `takemehomeassistant.local`.
- Web UI: `http://takemehomeassistant.local:8123` or `http://192.168.0.107:8123`.
- Local DNS/name resolution has been verified on the current network.
- HTTPS using a personally owned domain and a publicly trusted certificate is intentionally deferred. The goal is to avoid installing a private CA/root certificate on clients.

## Devices migrated from the old network

Home Assistant itself has been moved to the current network, but integrations and devices may still retain configuration from the previous network.

When rebuilding an integration:

1. Go to **Settings → Devices & services → Integrations**.
2. Remove the stale integration/config entry when a clean rebuild is required.
3. Re-add or rediscover the integration on the current network.
4. For devices that store their own Wi-Fi, Thread, HomeKit, or Matter network credentials, reset/recommission the physical device as required.

Prefer removing/rebuilding the integration or its config entry rather than manually deleting large numbers of individual entities.

### Matter

Matter devices require special care because network/fabric state is retained outside the Home Assistant entity registry.

For a Matter device that is still tied to the old network:

1. Remove the stale device from Home Assistant if needed.
2. Factory-reset the physical device when its network configuration cannot be changed in place.
3. Commission it again through the existing Matter integration/server.

Do not remove the Matter integration/server merely because individual devices are stale.

## Light groups

When multiple lights should behave as one controllable light, use a **Light group** helper instead of an automation or scene.

Create one at:

**Settings → Devices & services → Helpers → Create helper → Group → Light group**

Select the member lights and give the group a useful name. Home Assistant creates a new `light.*` entity for the group while preserving the original individual light entities.

The group entity can then be used on dashboards, in automations, and in scripts. If the member lights support brightness, a single brightness slider controls the group. Compatible color controls are also exposed by the group.

Use individual member entities when independent control is needed; use the group entity for normal room/fixture-level control.
