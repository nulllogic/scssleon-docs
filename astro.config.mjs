import {defineConfig} from 'astro/config';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import {iframe} from './src/utils/integrations/iframe'

export default defineConfig({
    site: 'https://nulllogic.github.io',
    base: 'scssleon-docs',
    integrations: [mdx(), sitemap(), preact(), iframe()],
    compressHTML: true,
    output: 'static',
    markdown: {
        extendDefaultPlugins: true,
    },
    security: {
        checkOrigin: true
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {},
            },
        }
    },
    devToolbar: {
        enabled: false
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    },
});
