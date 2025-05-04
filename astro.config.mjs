// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from "@astrojs/cloudflare"

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {enabled: true}
  }),
  site: "https://dashcruisedev.com",
  prefetch: true,
  trailingSlash: "ignore",
  i18n: {
    locales: ['en', 'de', 'pl'],
    defaultLocale: 'en',
    routing: 'manual'
  },
  integrations: [react(), mdx(), sitemap()],
  vite: {
    resolve: {
      // @ts-ignore
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },

    plugins: [tailwindcss(), sitemap()]
  }
})