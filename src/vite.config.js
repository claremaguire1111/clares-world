// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'three-stdlib/libs/lottie': false, // Exclude lottie.js from the build
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600, // Increase the limit if needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'three';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});


