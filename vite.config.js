import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Auto-open browser
    proxy: {
      // Proxy API requests to backend server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
