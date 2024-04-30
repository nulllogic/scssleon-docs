import {defineConfig} from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const tt = "test";

export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap(), preact()],
    compressHTML: true,
    output: 'server',
    markdown: {
        extendDefaultPlugins: true,
    },
    vite : {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `$url : ${tt};`,
                },
            },
        }
    }
});
