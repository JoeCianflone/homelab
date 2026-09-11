# Home Assistant Troubleshooting

## `takemehomeassistant.local` does not resolve

After moving Home Assistant to a new network, the `.local` hostname initially stopped resolving even though Home Assistant OS was running.

### Verify the host first

Check the router/client list and confirm the Raspberry Pi has received an address. The current Home Assistant address is:

`192.168.0.107`

If the IP address works but the `.local` hostname does not, the issue is name discovery/resolution rather than Home Assistant itself.

The hostname and direct-IP access have since been verified on the current network.

## Old-network devices are unavailable

A working Home Assistant host does not automatically migrate every connected device. Devices may still contain old Wi-Fi/network credentials, or an integration may contain stale discovery/config data.

Recommended recovery order:

1. Confirm the physical device is actually connected to the new network.
2. Reload/reconfigure the integration if it supports that cleanly.
3. If necessary, remove the integration/config entry and add it again.
4. Reset and recommission devices that retain their own old-network configuration.

Matter devices may need to be factory-reset and recommissioned; keep the Matter server/integration in place unless the server itself is the problem.
