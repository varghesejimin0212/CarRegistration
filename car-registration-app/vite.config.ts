import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Read backend URL from environment or use default
const BACKEND_URL = process.env.BACKEND_URL || 'https://localhost:7214';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL,
        secure: false,
        changeOrigin: true
      },
      '/carhub': {
        target: BACKEND_URL,
        ws: true,
        secure: false,
        changeOrigin: true
      }
    }
  }
});