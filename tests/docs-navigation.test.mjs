import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { documentationGroups, createSidebar, topNavigation } from '../.vitepress/navigation.mjs'

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)

async function findMarkdownFiles(directory = repositoryRoot) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    const relativeEntryPath = path.relative(repositoryRoot, entryPath)
    if (entry.name === '.git' || entry.name === 'node_modules') continue
    if (entry.isDirectory() && (
      relativeEntryPath === path.join('.vitepress', 'cache')
      || relativeEntryPath === path.join('.vitepress', 'dist')
      // Git-ignored temporary workflow output, deleted after review.
      || relativeEntryPath === '.superpowers'
    )) continue
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
  const discoveredFiles = await findMarkdownFiles()
  const navigationFiles = collectNavigationFiles(documentationGroups).sort()

  assert.deepEqual(navigationFiles, discoveredFiles)
  assert.equal(new Set(navigationFiles).size, navigationFiles.length)
})

test('sidebar maps the root README to the home route', () => {
  assert.equal(createSidebar()[0].items[0].link, '/')
})

test('sidebar maps ARCHITECTURE.md to its route', () => {
  assert.equal(createSidebar()[0].items[1].link, '/ARCHITECTURE')
})

test('sidebar preserves the nested Pi-hole group and overview route', () => {
  const piHole = createSidebar()[1].items.find((item) => item.text === 'Pi-hole')
  assert.ok(piHole)
  assert.equal(piHole.items[0].link, '/docs/services/pihole/README')
})

test('top navigation contains the intended links', () => {
  assert.deepEqual(topNavigation, [
    { text: 'Home', link: '/' },
    { text: 'Core', link: '/ARCHITECTURE' },
    { text: 'Services', link: '/SERVICES' },
    { text: 'ADRs', link: '/docs/adr/0001-choose-omada' },
    { text: 'Diagrams', link: '/docs/diagrams/physical-network' },
  ])
})
