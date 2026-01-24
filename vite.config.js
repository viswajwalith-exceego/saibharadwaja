import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, statSync, createReadStream, readdirSync } from 'fs'
import { join, extname, relative, resolve } from 'path'

// Simple MIME type mapping
const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.html': 'text/html'
}

function getContentType(filePath) {
  const ext = extname(filePath).toLowerCase()
  return mimeTypes[ext] || 'application/octet-stream'
}

// Plugin to serve root assets from root level during development (not under /New/)
function serveRootAssets() {
  const rootAssetFolders = ['images', 'pages', 'fonts', 'styles', 'scripts', 'photos', 'magazines']
  
  return {
    name: 'serve-root-assets',
    configureServer(server) {
      // Use a custom middleware that runs early but doesn't interfere with /New/ path
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        
        // Don't interfere with /New/ path or Vite's HMR
        if (url.startsWith('/New/') || url.startsWith('/@') || url.startsWith('/node_modules/')) {
          return next()
        }
        
        // Serve root assets from root level
        for (const folder of rootAssetFolders) {
          if (url.startsWith(`/${folder}/`)) {
            const filePath = join(process.cwd(), folder, url.substring(`/${folder}/`.length))
            
            if (existsSync(filePath) && statSync(filePath).isFile()) {
              const contentType = getContentType(filePath)
              res.setHeader('Content-Type', contentType)
              const stream = createReadStream(filePath)
              stream.on('error', () => next())
              stream.pipe(res)
              return
            }
          }
        }
        
        // Handle root-level files
        if (url === '/sbfavicon.ico' || url === '/sbHeaderMenu923.html') {
          const fileName = url.substring(1)
          const filePath = join(process.cwd(), fileName)
          
          if (existsSync(filePath) && statSync(filePath).isFile()) {
            const contentType = getContentType(filePath)
            res.setHeader('Content-Type', contentType)
            const stream = createReadStream(filePath)
            stream.on('error', () => next())
            stream.pipe(res)
            return
          }
        }
        
        next()
      })
    }
  }
}

// Helper function to recursively get all files matching a pattern
function getFilesRecursive(dir, pattern, baseDir = dir) {
  const files = []
  if (!existsSync(dir)) return files
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory()) {
        files.push(...getFilesRecursive(fullPath, pattern, baseDir))
      } else if (entry.isFile()) {
        const relativePath = relative(baseDir, fullPath).replace(/\\/g, '/')
        // Check if file matches pattern (simple glob matching)
        if (matchesPattern(relativePath, pattern)) {
          files.push(relativePath)
        }
      }
    }
  } catch (err) {
    // Ignore errors
  }
  
  return files
}

// Simple glob pattern matcher
function matchesPattern(path, pattern) {
  // Handle file extensions like {jpg,jpeg,png}
  let regexPattern = pattern
  
  // Replace {ext1,ext2,ext3} with (ext1|ext2|ext3)
  regexPattern = regexPattern.replace(/\{([^}]+)\}/g, (match, contents) => {
    const alternatives = contents.split(',').map(s => s.trim())
    return `(${alternatives.map(ext => ext.replace(/\./g, '\\.')).join('|')})`
  })
  
  // Convert glob pattern to regex
  regexPattern = regexPattern
    .replace(/\*\*/g, '.*')  // ** matches any path
    .replace(/\*/g, '[^/]*')  // * matches any filename
    .replace(/\./g, '\\.')    // Escape dots
  
  const regex = new RegExp(`^${regexPattern}$`, 'i')
  return regex.test(path)
}

// Plugin to prevent root assets from being bundled during build
// Transforms import.meta.glob() calls to use root-relative paths
function excludeRootAssetsFromBuild() {
  const rootAssetFolders = ['images', 'pages', 'fonts', 'styles', 'scripts', 'photos', 'magazines']
  
  return {
    name: 'exclude-root-assets-from-build',
    transform(code, id) {
      // Only process source files
      if (!id.includes('src/') || !code.includes('import.meta.glob')) {
        return null
      }
      
      // Check if this file uses import.meta.glob with root assets
      const rootAssetPattern = new RegExp(
        `import\\.meta\\.glob\\(['"](.*?)/(${rootAssetFolders.join('|')})/`,
        'i'
      )
      
      if (!rootAssetPattern.test(code)) {
        return null
      }
      
      let transformedCode = code
      const projectRoot = process.cwd()
      
      // Match all import.meta.glob() calls for root assets
      const globPattern = new RegExp(
        `import\\.meta\\.glob\\(['"]([^'"]*)/(${rootAssetFolders.join('|')})/([^'"]+)['"]([^)]*)\\)`,
        'gi'
      )
      
      transformedCode = transformedCode.replace(globPattern, (match, prefix, folder, pathPattern, optionsStr) => {
        // Parse options safely
        let isEager = false
        let asType = 'url'
        
        if (optionsStr) {
          // Simple parsing for common options
          if (optionsStr.includes('eager: true') || optionsStr.includes('eager:true')) {
            isEager = true
          }
          const asMatch = optionsStr.match(/as:\s*['"]([^'"]+)['"]/)
          if (asMatch) {
            asType = asMatch[1]
          }
        }
        
        // Build the full pattern - handle ** for recursive
        let fullPattern = pathPattern
        if (prefix.includes('..')) {
          // Calculate how many levels up
          const levels = (prefix.match(/\.\./g) || []).length
          // For root folders, we're already at the right level
          fullPattern = pathPattern
        }
        
        const rootFolderPath = resolve(projectRoot, folder)
        
        // Get all matching files at build time
        const matchingFiles = getFilesRecursive(rootFolderPath, fullPattern, rootFolderPath)
        
        // Generate the object with root-relative paths
        // The key should match what import.meta.glob would return
        const entries = matchingFiles.map(file => {
          const rootRelativePath = `/${folder}/${file}`
          // The key format should match the original import path
          // import.meta.glob('../../../magazines/*.pdf') returns keys like '../../../magazines/file.pdf'
          const key = `${prefix}/${folder}/${file}`.replace(/\\/g, '/')
          return `  '${key}': '${rootRelativePath}'`
        }).join(',\n')
        
        // Return the object directly (for eager) or a function (for lazy)
        if (isEager) {
          return `{\n${entries}\n}`
        } else {
          return `(() => ({\n${entries}\n}))()`
        }
      })
      
      return transformedCode !== code ? { code: transformedCode, map: null } : null
    },
    generateBundle(options, bundle) {
      // Remove bundled assets from root folders
      const rootAssetFoldersSet = new Set(rootAssetFolders)
      
      for (const fileName in bundle) {
        const chunk = bundle[fileName]
        
        if (chunk.type === 'asset') {
          // Check if this asset is from a root folder
          for (const folder of rootAssetFolders) {
            if (chunk.fileName.includes(folder) || 
                (chunk.name && chunk.name.includes(folder))) {
              // Delete this asset from the bundle
              delete bundle[fileName]
              break
            }
          }
        } else if (chunk.type === 'chunk' && chunk.code) {
          // Replace any remaining bundled asset paths with root-relative paths
          let modifiedCode = chunk.code
          
          // Pattern: /New/assets/hash-folder/file.ext -> /folder/file.ext
          const bundledPattern = new RegExp(
            `['"]/New/assets/[a-zA-Z0-9_-]+-(${rootAssetFolders.join('|')})/([^'"]+)['"]`,
            'gi'
          )
          
          modifiedCode = modifiedCode.replace(bundledPattern, (match, folder, filePath) => {
            return `"/${folder}/${filePath}"`
          })
          
          if (modifiedCode !== chunk.code) {
            chunk.code = modifiedCode
          }
        }
      }
    }
  }
}

// Plugin to ensure root-relative asset paths remain root-relative (not prefixed with base)
function preserveRootAssetPaths() {
  const rootAssetPaths = ['/images/', '/pages/', '/fonts/', '/styles/', '/scripts/', '/photos/', '/magazines/']
  
  return {
    name: 'preserve-root-asset-paths',
    transformIndexHtml(html) {
      // Ensure root-relative asset paths are not prefixed with base path
      let modifiedHtml = html
      
      rootAssetPaths.forEach(path => {
        // Replace any accidental base prefixing
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
    serveRootAssets(),
    excludeRootAssetsFromBuild(),
    preserveRootAssetPaths()
  ],
  base: '/New/',
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Customize asset file names, but we'll handle root assets differently
        assetFileNames: (assetInfo) => {
          // If asset is from a root folder, we don't want it bundled
          const rootAssetFolders = ['images', 'pages', 'fonts', 'styles', 'scripts', 'photos', 'magazines']
          for (const folder of rootAssetFolders) {
            if (assetInfo.name && assetInfo.name.includes(folder)) {
              // Return a path that we can identify and replace later
              return `assets/${assetInfo.name}`
            }
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  publicDir: 'public'
})
