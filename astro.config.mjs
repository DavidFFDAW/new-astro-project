import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';
import vercelServerless from '@astrojs/vercel/serverless';
// import node from "@astrojs/node";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercelServerless(),
  plugins: [VitePWA({
    registerType: 'autoUpdate'
  })],
  integrations: [react()]
});