// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://itqan.app',
  trailingSlash: 'ignore',
  output: 'server',
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
  },
  integrations: [
    tailwind(),
    vercel({
      imageService: true
    }),
    compress()
  ],
  vite: {
    build: {
      cssMinify: true,
      minify: true
    }
  }
});
