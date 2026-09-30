import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => ({
  root: 'src',
  publicDir: '../public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  appType: 'spa',
  base: mode === 'production' ? '/memory-game/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
}));
