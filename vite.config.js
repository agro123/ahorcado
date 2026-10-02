import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',

  server: {
    port: 3100,
    strictPort: true,
    open: true,
  },

  preview: {
    port: 3101,
    strictPort: true,
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
});