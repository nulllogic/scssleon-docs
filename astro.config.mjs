import {defineConfig} from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import {lifecycleLogs} from './src/utils/integrations/docs'

export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap(), preact()],
    compressHTML: true,
    output: 'server',
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
    }
});
