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
