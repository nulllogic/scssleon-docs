import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import {iframe} from './src/utils/integrations/iframe'

export default defineConfig({
  site: 'https://nulllogic.github.io',
  // adding sub directory ( it's required for github pages )
  base: import.meta.env.PROD ? '/scssleon-docs' : '',
  integrations: [mdx(), sitemap(), preact(), iframe(), (await import('astro-compress')).default({
    CSS: true,
    HTML: true,
    SVG: true,
  })],
  prefetch: true,
  compressHTML: true,
  output: 'static',
  security: {
    checkOrigin: true,
  },
  server: {
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
})