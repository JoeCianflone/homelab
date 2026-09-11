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
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.superpowers') continue
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
  } catch (error) {
    if (error?.code !== 'ERR_MODULE_NOT_FOUND') throw error
  }

  const discoveredFiles = await findMarkdownFiles()
  const navigationFiles = collectNavigationFiles(documentationGroups).sort()

  assert.deepEqual(navigationFiles, discoveredFiles)
  assert.equal(new Set(navigationFiles).size, navigationFiles.length)
})
