// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'three-stdlib/libs/lottie': false,  // Exclude lottie.js from the build
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 600,  // Adjust this to handle larger bundles
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'three';  // Separate three.js into its own chunk
            }
            return 'vendor';  // Separate vendor chunks
          }
        },
      },
    },
  },
});




