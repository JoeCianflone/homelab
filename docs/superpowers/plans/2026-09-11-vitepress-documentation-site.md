# VitePress Documentation Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a pnpm-managed VitePress site that renders every repository Markdown file locally and fails validation when a document is omitted from navigation.

**Architecture:** VitePress runs with the repository root as its source and rewrites `README.md` to the root route. A framework-independent navigation module owns document grouping and route generation; both the VitePress configuration and a Node test consume that module.

**Tech Stack:** Node.js 24, pnpm 11, VitePress 1.6.4, Node's built-in test runner

**Spec:** `docs/superpowers/specs/2026-09-11-vitepress-documentation-site-design.md`

## Global Constraints

- Existing Markdown files remain in their current locations.
- Existing infrastructure naming decisions remain unchanged.
- The site uses VitePress's default theme with no custom styling in this change.
- No deployment configuration is added.
- Generated output and dependency directories are not committed.
- Every repository Markdown file is represented exactly once in navigation.

---

### Task 1: Navigation catalog and Markdown coverage

**Files:**
- Create: `.vitepress/navigation.mjs`
- Create: `tests/docs-navigation.test.mjs`

**Interfaces:**
- Produces: `documentationGroups`, an array of `{ text: string, items: NavigationItem[] }` groups where leaf items contain `{ text: string, file: string }`.
- Produces: `topNavigation`, a VitePress-compatible array of `{ text: string, link: string }` items.
- Produces: `createSidebar()`, which returns VitePress-compatible sidebar groups with file paths converted to routes.
- Consumes: Markdown paths currently tracked or present in the working tree, including this plan and its design spec.

- [ ] **Step 1: Write the failing navigation coverage test**

Create `tests/docs-navigation.test.mjs`:

```js
import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)

async function findMarkdownFiles(directory = repositoryRoot) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue
    if (directory === repositoryRoot && entry.name === '.vitepress') continue

    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await findMarkdownFiles(entryPath))
    } else if (entry.name.endsWith('.md')) {
      files.push(path.relative(repositoryRoot, entryPath))
    }
  }

  return files.sort()
}

function collectNavigationFiles(items) {
  return items.flatMap((item) => (
    item.file ? [item.file] : collectNavigationFiles(item.items ?? [])
  ))
}

test('navigation contains every Markdown document exactly once', async () => {
  let documentationGroups = []

  try {
    ({ documentationGroups } = await import('../.vitepress/navigation.mjs'))
  } catch {
    // The first run proves the catalog does not exist yet.
  }

  const discoveredFiles = await findMarkdownFiles()
  const navigationFiles = collectNavigationFiles(documentationGroups).sort()

  assert.deepEqual(navigationFiles, discoveredFiles)
  assert.equal(new Set(navigationFiles).size, navigationFiles.length)
})
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```sh
node --test tests/docs-navigation.test.mjs
```

Expected: one failed test whose deep-equality difference lists all discovered Markdown files as missing from navigation.

- [ ] **Step 3: Implement the navigation catalog**

Create `.vitepress/navigation.mjs`:

```js
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
      {
        text: 'VitePress site design',
        file: 'docs/superpowers/specs/2026-09-11-vitepress-documentation-site-design.md',
      },
      {
        text: 'VitePress implementation plan',
        file: 'docs/superpowers/plans/2026-09-11-vitepress-documentation-site.md',
      },
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
```

- [ ] **Step 4: Run the navigation test and verify it passes**

Run:

```sh
node --test tests/docs-navigation.test.mjs
```

Expected: one passing test and zero failures.

- [ ] **Step 5: Review the focused diff**

Run:

```sh
git diff -- .vitepress/navigation.mjs tests/docs-navigation.test.mjs
```

Confirm the catalog contains all current Markdown paths exactly once and that the test excludes only `.git`, `node_modules`, and `.vitepress`.

---

### Task 2: VitePress toolchain, clean build, and usage documentation

**Files:**
- Create: `package.json`
- Create: `pnpm-lock.yaml`
- Create: `.vitepress/config.mts`
- Modify: `.gitignore`
- Modify: `README.md`
- Modify: `docs/services/pihole/installation.md`
- Modify: `docs/services/pihole/troubleshooting.md`

**Interfaces:**
- Consumes: `createSidebar()` and `topNavigation` from `.vitepress/navigation.mjs`.
- Produces: pnpm commands `test`, `docs:dev`, `docs:build`, and `docs:preview`.
- Produces: a VitePress production site in `.vitepress/dist`, excluded from Git.
- Produces: `/` from `README.md` through the VitePress rewrite configuration.

- [ ] **Step 1: Demonstrate that the production build command does not exist**

Run:

```sh
pnpm docs:build
```

Expected: non-zero exit because the repository has no `package.json` and no `docs:build` script.

- [ ] **Step 2: Add the pnpm package definition**

Create `package.json`:

```json
{
  "name": "homelab-docs",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "docs:dev": "vitepress .",
    "docs:build": "vitepress build .",
    "docs:preview": "vitepress preview ."
  },
  "devDependencies": {
    "vitepress": "1.6.4"
  },
  "packageManager": "pnpm@11.0.9"
}
```

- [ ] **Step 3: Add the VitePress configuration**

Create `.vitepress/config.mts`:

```ts
import { defineConfig } from 'vitepress'
import { createSidebar, topNavigation } from './navigation.mjs'

export default defineConfig({
  title: 'Homelab',
  description: 'Architecture, services, operations, and decisions for the homelab.',
  cleanUrls: true,
  rewrites: {
    'README.md': 'index.md',
  },
  themeConfig: {
    nav: topNavigation,
    sidebar: createSidebar(),
    outline: {
      level: [2, 3],
    },
  },
})
```

- [ ] **Step 4: Ignore generated VitePress and pnpm content**

Update `.gitignore` to contain:

```gitignore
.DS_Store
node_modules/
.vitepress/cache/
.vitepress/dist/
```

- [ ] **Step 5: Document local usage**

Append this section to `README.md`:

````markdown
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
````

- [ ] **Step 6: Install the pinned dependency and create the lockfile**

Run:

```sh
pnpm install
```

Expected: pnpm installs VitePress 1.6.4 and writes `pnpm-lock.yaml`.

- [ ] **Step 7: Run the production build and capture link failures**

Run:

```sh
pnpm docs:build
```

Expected: the build reaches Markdown link validation and reports the stale Pi-hole section links that no longer have matching headings.

- [ ] **Step 8: Repair the stale Pi-hole links**

In `docs/services/pihole/installation.md`:

- Replace the `configuration.md#upstream-dns` link with `configuration.md`.
- Replace the `configuration.md#dhcp-reservation` link with `configuration.md`.
- Replace the `configuration.md#verification` link with `configuration.md#client-verification`.

In `docs/services/pihole/troubleshooting.md`:

- Replace `configuration.md#why-the-resolver-shows-127001` with `configuration.md`.
- Replace `architecture.md#decision-dhcp-stays-on-the-router-for-now` with `architecture.md`.

These edits preserve the surrounding operational guidance while pointing at sections that exist in the current working copy.

- [ ] **Step 9: Run the complete verification suite**

Run:

```sh
pnpm test
pnpm docs:build
git diff --check
```

Expected: the Node test passes, the VitePress production build exits successfully, and Git reports no whitespace errors.

- [ ] **Step 10: Inspect repository state without staging unrelated changes**

Run:

```sh
git status --short
git diff -- package.json pnpm-lock.yaml .gitignore .vitepress tests README.md docs/services/pihole/installation.md docs/services/pihole/troubleshooting.md
```

Confirm generated `node_modules`, `.vitepress/cache`, and `.vitepress/dist` content is ignored. Preserve all pre-existing documentation edits in the working tree and do not include them in an implementation commit without explicit user direction.
