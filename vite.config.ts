import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { config } from 'dotenv';

// Load environment variables
config();

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: './postcss.config.js',
  },
});