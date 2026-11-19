// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://securecore.id',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
    // Always emit CSS as external files so the Content-Security-Policy
    // can stay strict (style-src 'self', no 'unsafe-inline').
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Never inline scripts/assets into HTML — keeps CSP script-src 'self' valid.
      assetsInlineLimit: 0,
    },
  },
  devToolbar: {
    enabled: false,
  },
});
