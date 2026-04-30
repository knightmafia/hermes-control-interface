import { defineConfig } from 'vite';
import { resolve } from 'path';

const backendUrl = process.env.HCI_BACKEND_URL || 'http://localhost:10272';
const backendWsUrl = backendUrl.replace(/^http/, 'ws');

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': backendUrl,
      '/ops-console/api': {
        target: backendUrl,
        rewrite: (path) => path.replace(/^\/ops-console/, ''),
      },
      '/ws': {
        target: backendWsUrl,
        ws: true,
      },
      '/ops-console/ws': {
        target: backendWsUrl,
        ws: true,
        rewrite: (path) => path.replace(/^\/ops-console/, ''),
      },
    },
  },
  css: {
    devSourcemap: true,
  },
});
