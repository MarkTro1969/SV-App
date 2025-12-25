
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // This connects the API_KEY you typed in Vercel to the actual app code
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000
  }
});
