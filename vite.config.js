import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Change to '/subfolder/' if deploying to a subfolder
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    // Ensure proper asset handling
    assetsDir: 'assets',
    // Generate source maps for debugging (optional, remove in production)
    sourcemap: false
  }
})

