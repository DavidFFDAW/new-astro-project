import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa'

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  plugins: [
    VitePWA({ registerType: 'autoUpdate' })
  ]
});