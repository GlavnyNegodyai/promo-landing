import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://glavnynegodyai.github.io',
  base: '/promo-landing',
  integrations: [
    react({
      strictMode: false,
    }),
  ],

  server: {
    host: '127.0.0.1',
    port: 4321,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});