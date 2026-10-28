import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      // GitHub Pages serves 404.html for unknown paths, which gives retired
      // URLs (the old /services, /case-studies, /insights) the styled error page.
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    alias: {
      $lib: './src/lib',
      $components: './src/lib/components',
      $types: './src/lib/types',
      $utils: './src/lib/utils'
    }
  }
};

export default config;
