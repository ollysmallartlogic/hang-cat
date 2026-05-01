/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Project site at https://ollysmallartlogic.github.io/hang-cat — assets must
  // resolve under /hang-cat/. Dev server (`vite`) ignores `base` and stays at /.
  base: '/hang-cat/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
