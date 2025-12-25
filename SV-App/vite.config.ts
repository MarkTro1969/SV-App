import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './',
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: '/index.html',
    },
  },
  server: {
    port: 3000
  }
});
