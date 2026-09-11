export const documentationGroups = [
  {
    text: 'Core documentation',
    items: [
      { text: 'Home', file: 'README.md' },
      { text: 'Architecture', file: 'ARCHITECTURE.md' },
      { text: 'Network', file: 'NETWORK.md' },
      { text: 'VLANs', file: 'VLANS.md' },
      { text: 'Firewall', file: 'FIREWALL.md' },
      { text: 'Hardware', file: 'HARDWARE.md' },
      { text: 'Inventory', file: 'INVENTORY.md' },
      { text: 'Services', file: 'SERVICES.md' },
      { text: 'Roadmap', file: 'ROADMAP.md' },
    ],
  },
  {
    text: 'Services',
    items: [
      {
        text: 'Pi-hole',
        items: [
          { text: 'Overview', file: 'docs/services/pihole/README.md' },
          { text: 'Architecture', file: 'docs/services/pihole/architecture.md' },
          { text: 'Installation', file: 'docs/services/pihole/installation.md' },
          { text: 'Configuration', file: 'docs/services/pihole/configuration.md' },
          { text: 'Troubleshooting', file: 'docs/services/pihole/troubleshooting.md' },
          { text: 'Backup and restore', file: 'docs/services/pihole/backup-and-restore.md' },
          { text: 'Updates', file: 'docs/services/pihole/updates.md' },
          { text: 'Migration', file: 'docs/services/pihole/migration.md' },
        ],
      },
      {
        text: 'Home Assistant',
        items: [
          { text: 'Overview', file: 'docs/services/homeassistant/README.md' },
          { text: 'Installation', file: 'docs/services/homeassistant/installation.md' },
          { text: 'Configuration', file: 'docs/services/homeassistant/configuration.md' },
          { text: 'Troubleshooting', file: 'docs/services/homeassistant/troubleshooting.md' },
          { text: 'Migration', file: 'docs/services/homeassistant/migration.md' },
        ],
      },
      { text: 'Omada', file: 'docs/services/omada/README.md' },
      { text: 'Docker', file: 'docs/services/docker/README.md' },
      { text: 'NAS', file: 'docs/services/nas/README.md' },
      { text: 'Plex', file: 'docs/services/plex/README.md' },
    ],
  },
  {
    text: 'Architecture decisions',
    items: [
      { text: 'ADR 0001: Choose Omada', file: 'docs/adr/0001-choose-omada.md' },
      { text: 'ADR 0002: Home Assistant OS', file: 'docs/adr/0002-home-assistant-os.md' },
      { text: 'ADR 0003: VLAN strategy', file: 'docs/adr/0003-vlan-strategy.md' },
      { text: 'ADR 0004: Device naming', file: 'docs/adr/0004-device-naming.md' },
      { text: 'ADR 0005: IP addressing', file: 'docs/adr/0005-ip-addressing.md' },
    ],
  },
  {
    text: 'Diagrams',
    items: [
      { text: 'Physical network', file: 'docs/diagrams/physical-network.md' },
      { text: 'Logical network', file: 'docs/diagrams/logical-network.md' },
    ],
  },
  {
    text: 'Project guidance',
    items: [
      { text: 'Agent guidance', file: 'AGENTS.md' },
      { text: 'Codex project context', file: 'CODEX.md' },
      { text: 'VitePress site design', file: 'docs/superpowers/specs/2026-09-11-vitepress-documentation-site-design.md' },
      { text: 'VitePress implementation plan', file: 'docs/superpowers/plans/2026-09-11-vitepress-documentation-site.md' },
    ],
  },
]

function fileToRoute(file) {
  if (file === 'README.md') return '/'
  return `/${file.replace(/\.md$/, '')}`
}

function sidebarItems(items) {
  return items.map((item) => {
    if (item.file) return { text: item.text, link: fileToRoute(item.file) }
    return { text: item.text, items: sidebarItems(item.items ?? []) }
  })
}

export function createSidebar() {
  return documentationGroups.map((group) => ({
    text: group.text,
    items: sidebarItems(group.items),
  }))
}

export const topNavigation = [
  { text: 'Home', link: '/' },
  { text: 'Core', link: '/ARCHITECTURE' },
  { text: 'Services', link: '/SERVICES' },
  { text: 'ADRs', link: '/docs/adr/0001-choose-omada' },
  { text: 'Diagrams', link: '/docs/diagrams/physical-network' },
]
