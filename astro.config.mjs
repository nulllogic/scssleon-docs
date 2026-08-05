import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {defineConfig} from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import {unified, rehypeHeadingIds} from '@astrojs/markdown-remark';

import {iframe} from './src/utils/integrations/iframe';

export default defineConfig({
  site: 'https://nulllogic.github.io',
  // adding sub directory ( it's required for github pages )
  base: import.meta.env.PROD ? '/scssleon-docs' : '',
  integrations: [
    mdx({
      processor: unified({
        rehypePlugins: [rehypeHeadingIds],
      }),
    }),
    sitemap(),
    iframe(),
    (await import('astro-compress')).default({
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
    css: {
      modules: {
        // This disables the hash and keeps your raw class name
        generateScopedName: '[local]',
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  }
});