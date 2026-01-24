import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to ensure root-relative asset paths remain root-relative (not prefixed with base)
function preserveRootAssetPaths() {
  // Root asset folders that should remain at root level
  const rootAssetPaths = ['/images/', '/pages/', '/fonts/', '/styles/', '/scripts/', '/photos/', '/magazines/']
  
  return {
    name: 'preserve-root-asset-paths',
    transformIndexHtml(html) {
      // Ensure root-relative asset paths are not prefixed with base path
      // Vite's base option shouldn't affect absolute paths starting with /,
      // but we add a safeguard to ensure they remain root-relative
      let modifiedHtml = html
      
      rootAssetPaths.forEach(path => {
        // Replace any accidental base prefixing (shouldn't happen with Vite, but safeguard)
        const basePrefixed = `/New${path}`
        const regex = new RegExp(basePrefixed.replace(/\//g, '\\/'), 'g')
        if (modifiedHtml.includes(basePrefixed)) {
          modifiedHtml = modifiedHtml.replace(regex, path)
        }
      })
      
      return modifiedHtml
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    preserveRootAssetPaths()
  ],
  base: '/New/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  publicDir: 'public'
})
