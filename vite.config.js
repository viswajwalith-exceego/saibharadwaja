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
        
        // Redirect old /Photos/ path (capital P) to React route
        if (url.startsWith('/Photos/') || url === '/Photos') {
          res.writeHead(301, { Location: '/New/media/photos' })
          res.end()
          return
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
  if (!existsSync(dir)) {
    console.warn(`[vite-plugin] Directory not found: ${dir}`)
    return files
  }
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory()) {
        // Always recurse into subdirectories for ** patterns
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
    console.warn(`[vite-plugin] Error reading directory ${dir}:`, err.message)
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
  // For recursive patterns like **/*.jpg, we've already removed the **/ prefix
  // So we just need to match the filename pattern against the end of the path
  // e.g., pattern "*.{jpg,png}" should match "folder/subfolder/file.jpg"
  regexPattern = regexPattern
    .replace(/\*\*/g, '.*')  // ** matches any path (including slashes) - though we handle this separately
    .replace(/\*/g, '[^/]*')  // * matches any filename (but not slashes)
    .replace(/\./g, '\\.')    // Escape dots
  
  // For patterns like "*.{jpg,png}", match against the filename (last part of path)
  // For patterns with path components, match the full relative path
  const pathParts = path.split('/')
  const fileName = pathParts[pathParts.length - 1]
  
  // Try matching against filename first (for patterns like *.jpg)
  // Pattern like "*.{jpg,png}" becomes "^.*\\.(jpg|png)$"
  const fileNameRegex = new RegExp(`^${regexPattern}$`, 'i')
  if (fileNameRegex.test(fileName)) {
    return true
  }
  
  // Also try matching against full path (for patterns with subdirectories)
  const fullPathRegex = new RegExp(`^${regexPattern}$`, 'i')
  if (fullPathRegex.test(path)) {
    return true
  }
  
  return false
}

// Plugin to prevent root assets from being bundled during build
// Transforms import.meta.glob() calls to use root-relative paths
function excludeRootAssetsFromBuild() {
  const rootAssetFolders = ['images', 'pages', 'fonts', 'styles', 'scripts', 'photos', 'magazines']
  
  return {
    name: 'exclude-root-assets-from-build',
    enforce: 'pre', // Run before other plugins to intercept import.meta.glob early
    buildStart() {
      // Log when build starts to verify plugin is running
      console.log('[vite-plugin] Build started - excludeRootAssetsFromBuild plugin active')
      console.log('[vite-plugin] Project root:', process.cwd())
      // Verify images folder exists
      const imagesPath = resolve(process.cwd(), 'images')
      console.log('[vite-plugin] Images folder exists:', existsSync(imagesPath))
      if (existsSync(imagesPath)) {
        const photosPath = resolve(imagesPath, 'Photos')
        console.log('[vite-plugin] Photos folder exists:', existsSync(photosPath))
        if (existsSync(photosPath)) {
          try {
            const dirs = readdirSync(photosPath, { withFileTypes: true })
              .filter(d => d.isDirectory())
              .map(d => d.name)
            console.log('[vite-plugin] Photo gallery folders:', dirs.slice(0, 5))
          } catch (e) {
            console.warn('[vite-plugin] Could not read Photos folder:', e.message)
          }
        }
      }
    },
    transform(code, id, options) {
      // Only process source files
      if (!id.includes('src/') || !code.includes('import.meta.glob')) {
        return null
      }
      
      // Check if we're in build mode
      // In build mode, we need to transform import.meta.glob to use root-relative paths
      // In dev mode, let Vite handle it natively
      const isBuild = process.argv.includes('build') || process.env.NODE_ENV === 'production'
      const isDev = !isBuild
      
      if (isDev) {
        // In dev mode, don't transform - let Vite handle it natively
        // The serveRootAssets middleware will serve the files correctly
        return null
      }
      
      console.log(`[vite-plugin] BUILD MODE: Processing import.meta.glob in file: ${id}`)
      
      // This transform should work in both dev and build modes
      // Vite processes import.meta.glob() early, so we need to intercept it
      
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
      // Pattern: import.meta.glob('../../../images/Photos/**/*.jpg', ...)
      // We need to match: prefix (../../../), folder (images), optional subfolder (Photos), pattern (**/*.jpg)
      // The pattern can be: images/Photos/**/*.jpg or images/**/*.jpg
      // Use word boundaries to ensure we match the exact folder name, not a substring
      // The regex needs to handle: prefix/folder/subfolder/pattern or prefix/folder/pattern
      const globPattern = new RegExp(
        `import\\.meta\\.glob\\(['"]([^'"]*)/(${rootAssetFolders.map(f => `\\b${f}\\b`).join('|')})(?:/([^/'"*]+))?/([^'"]+)['"]([^)]*)\\)`,
        'gi'
      )
      
      // Debug: Log what we're trying to match
      if (code.includes('images/Photos')) {
        console.log(`[vite-plugin] Code contains 'images/Photos', testing pattern match...`)
      }
      
      let replacementCount = 0
      transformedCode = transformedCode.replace(globPattern, (match, prefix, folder, subfolder, pathPattern, optionsStr) => {
        replacementCount++
        console.log(`[vite-plugin] Matched import.meta.glob pattern: ${match.substring(0, 80)}...`)
        console.log(`[vite-plugin] Prefix: ${prefix}, Folder: ${folder}, Subfolder: ${subfolder || '(none)'}, PathPattern: ${pathPattern}`)
        
        // Fix: If prefix ends with a root asset folder name, it means we matched incorrectly
        // e.g., if prefix is "../../../images" and folder is "Photos", we need to fix this
        const prefixParts = prefix.split('/').filter(p => p)
        const lastPrefixPart = prefixParts[prefixParts.length - 1]
        if (rootAssetFolders.includes(lastPrefixPart) && folder !== lastPrefixPart) {
          // The prefix incorrectly includes the folder name
          // e.g., prefix="../../../images", folder="Photos" should be prefix="../../..", folder="images", subfolder="Photos"
          console.log(`[vite-plugin] Fixing incorrect match: prefix includes folder name`)
          const correctedPrefix = prefixParts.slice(0, -1).join('/') + (prefixParts.length > 1 ? '/' : '') + (prefix.startsWith('/') ? '' : '')
          const correctedFolder = lastPrefixPart
          const correctedSubfolder = folder
          console.log(`[vite-plugin] Corrected: Prefix: ${correctedPrefix}, Folder: ${correctedFolder}, Subfolder: ${correctedSubfolder}`)
          // Update variables
          prefix = correctedPrefix || '../../..'
          folder = correctedFolder
          subfolder = correctedSubfolder
        }
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
        // For ** patterns, we need to match files in any subdirectory
        // Remove leading **/ if present (we'll handle recursion in getFilesRecursive)
        if (fullPattern.startsWith('**/')) {
          fullPattern = fullPattern.substring(3)
        }
        // For recursive patterns, we need to match files at any depth
        // The pattern after **/ should match the filename pattern
        // e.g., **/*.{jpg,png} should match any .jpg or .png file in any subdirectory
        
        const rootFolderPath = resolve(projectRoot, folder)
        
        // Get all matching files at build time
        // For ** patterns, we always recurse, and match against the filename pattern
        // Note: The pattern might be like "Photos/**/*.jpg" or subfolder might be extracted from regex
        let searchPath = rootFolderPath
        let filePattern = fullPattern
        let subfolderPrefix = ''
        
        // If we have a subfolder from the regex match (e.g., "Photos" from "images/Photos/**/*.jpg")
        if (subfolder) {
          searchPath = resolve(rootFolderPath, subfolder)
          subfolderPrefix = subfolder
          console.log(`[vite-plugin] Using subfolder from regex: ${subfolder}, searchPath: ${searchPath}`)
          // The pathPattern should already be the pattern after the subfolder
          // e.g., "**/*.{jpg,png}" from "images/Photos/**/*.{jpg,png}"
          if (filePattern.startsWith('**/')) {
            filePattern = filePattern.substring(3) // Remove "**/" prefix
          }
          console.log(`[vite-plugin] File pattern after subfolder: ${filePattern}`)
        } else if (pathPattern.includes('/') && !pathPattern.startsWith('**/')) {
          // Fallback: If pathPattern includes a subfolder (e.g., "Photos/**/*.jpg"), extract it
          const pathParts = pathPattern.split('/')
          const extractedSubfolder = pathParts[0]
          if (extractedSubfolder && extractedSubfolder !== '**') {
            searchPath = resolve(rootFolderPath, extractedSubfolder)
            subfolderPrefix = extractedSubfolder
            console.log(`[vite-plugin] Extracted subfolder from pathPattern: ${extractedSubfolder}, searchPath: ${searchPath}`)
            filePattern = pathParts.slice(1).join('/')
            if (filePattern.startsWith('**/')) {
              filePattern = filePattern.substring(3)
            }
            console.log(`[vite-plugin] File pattern after extraction: ${filePattern}`)
          }
        } else if (pathPattern.startsWith('**/')) {
          // Pattern is just "**/*.{jpg,png}" - search in rootFolderPath
          filePattern = pathPattern.substring(3)
          console.log(`[vite-plugin] Pattern starts with **/, using rootFolderPath: ${rootFolderPath}`)
        }
        
        // Check if searchPath exists
        if (!existsSync(searchPath)) {
          console.error(`[vite-plugin] ERROR: Search path does not exist: ${searchPath}`)
          console.error(`[vite-plugin] Project root: ${projectRoot}`)
          console.error(`[vite-plugin] Folder: ${folder}, Subfolder: ${subfolderPrefix}`)
          console.error(`[vite-plugin] Root folder path: ${rootFolderPath}`)
          // Try to list what's actually in the root folder
          if (existsSync(rootFolderPath)) {
            try {
              const dirContents = readdirSync(rootFolderPath)
              console.error(`[vite-plugin] Contents of ${rootFolderPath}:`, dirContents.slice(0, 10))
            } catch (e) {
              console.error(`[vite-plugin] Could not read directory:`, e.message)
            }
          }
          // Return original match so Vite can handle it, but this will likely fail
          // Better to return empty object so the app doesn't crash
          if (isEager) {
            return `{}`
          } else {
            return `(() => ({}))()`
          }
        }
        
        console.log(`[vite-plugin] Searching in: ${searchPath} for pattern: ${filePattern}`)
        console.log(`[vite-plugin] Search path exists: ${existsSync(searchPath)}`)
        
        if (!existsSync(searchPath)) {
          console.error(`[vite-plugin] ERROR: Search path does not exist: ${searchPath}`)
          console.error(`[vite-plugin] Project root: ${projectRoot}`)
          console.error(`[vite-plugin] Root folder path: ${rootFolderPath}`)
          if (isEager) {
            return `{}`
          } else {
            return `(() => ({}))()`
          }
        }
        
        const matchingFiles = getFilesRecursive(searchPath, filePattern, searchPath)
        console.log(`[vite-plugin] Found ${matchingFiles.length} matching files before filtering`)
        if (matchingFiles.length > 0) {
          console.log(`[vite-plugin] Sample files found:`, matchingFiles.slice(0, 5))
        } else {
          console.warn(`[vite-plugin] WARNING: No files found! This will result in empty object.`)
          console.warn(`[vite-plugin] The post-build script should fix this, but check file paths.`)
        }
        
        // Filter out unitegallery and other non-photo assets
        const filteredFiles = matchingFiles.filter(file => {
          // Exclude unitegallery assets
          if (file.includes('unitegallery') || file.includes('UniteGallery')) return false
          // For Photos folder, only include actual photo galleries (folders with numbers)
          if (folder === 'images' && subfolderPrefix === 'Photos') {
            // Exclude files directly in Photos root
            const parts = file.split('/')
            if (parts.length === 0) return false
            // Check if it's in a numbered gallery folder (e.g., "1 Early Years", "2 Family")
            const galleryFolder = parts[0]
            if (!galleryFolder || !/^\d+\s+/.test(galleryFolder)) {
              return false
            }
          }
          return true
        })
        
        console.log(`[vite-plugin] Found ${filteredFiles.length} files matching pattern ${pathPattern} in ${folder} (filtered from ${matchingFiles.length})`)
        if (filteredFiles.length === 0 && matchingFiles.length > 0) {
          console.warn(`[vite-plugin] All files were filtered out. Sample files:`, matchingFiles.slice(0, 3))
        }
        
        // Generate the object with root-relative paths
        // The key should match what import.meta.glob would return (original import path format)
        const entries = filteredFiles.map(file => {
          // Build the correct path: include subfolder prefix if we searched in a subfolder
          const relativePath = subfolderPrefix ? `${subfolderPrefix}/${file}` : file
          // Ensure the path starts with the folder (e.g., /images/Photos/...)
          const rootRelativePath = `/${folder}/${relativePath}`
          // The key format must match the original import path exactly
          // import.meta.glob('../../../images/Photos/**/*.jpg') returns keys like '../../../images/Photos/folder/file.jpg'
          // We need to preserve this format for the code to work correctly
          const key = `${prefix}/${folder}/${relativePath}`.replace(/\\/g, '/')
          // Escape single quotes in paths
          const escapedKey = key.replace(/'/g, "\\'")
          const escapedValue = rootRelativePath.replace(/'/g, "\\'")
          return `  '${escapedKey}': '${escapedValue}'`
        }).join(',\n')
        
        // Return the object directly (for eager) or a function (for lazy)
        if (filteredFiles.length === 0) {
          console.warn(`[vite-plugin] WARNING: No files found for pattern ${pathPattern} in ${folder}. Search path: ${searchPath}, File pattern: ${filePattern}`)
          // Return empty object but don't fail
          if (isEager) {
            return `{}`
          } else {
            return `(() => ({}))()`
          }
        }
        
        if (isEager) {
          return `{\n${entries}\n}`
        } else {
          return `(() => ({\n${entries}\n}))()`
        }
      })
      
      if (replacementCount > 0) {
        console.log(`[vite-plugin] Transformed ${replacementCount} import.meta.glob call(s) in ${id}`)
      }
      
      return transformedCode !== code ? { code: transformedCode, map: null } : null
    },
    generateBundle(options, bundle) {
      // Remove bundled assets from root folders
      // BUT: Don't delete CSS/JS files that are part of the React app bundle
      const rootAssetFoldersSet = new Set(rootAssetFolders)
      
      for (const fileName in bundle) {
        const chunk = bundle[fileName]
        
        if (chunk.type === 'asset') {
          // NEVER delete CSS or JS files - these are always part of the React app bundle
          // CSS files are bundled by Vite and should always be included
          if (fileName.endsWith('.css') || fileName.endsWith('.js') || fileName.endsWith('.mjs')) {
            continue
          }
          
          // Only delete other asset types (images, fonts, etc.) that are from root folders
          // and are being incorrectly bundled
          for (const folder of rootAssetFolders) {
            // Only delete if it's actually from the root folder, not from src/
            // React app assets should have hashed names or be in assets/ folder
            if ((chunk.fileName.includes(folder) || 
                (chunk.name && chunk.name.includes(folder))) &&
                !chunk.fileName.includes('index') &&
                !chunk.fileName.includes('main') &&
                !fileName.match(/^[a-f0-9]+-[a-f0-9]+\./) &&
                !fileName.startsWith('assets/')) {
              // Delete this asset from the bundle (but never CSS/JS)
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
          // BUT: CSS files from src/ should be bundled normally
          const rootAssetFolders = ['images', 'pages', 'fonts', 'styles', 'scripts', 'photos', 'magazines']
          
          // Don't exclude if it's a CSS file from src/ (React app CSS)
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            // Check if it's from src/ folder (React app CSS) - these should be bundled
            if (assetInfo.name.includes('src') || assetInfo.name.includes('main.css') || assetInfo.name.includes('index')) {
              return 'assets/[name]-[hash][extname]'
            }
          }
          
          for (const folder of rootAssetFolders) {
            // Only exclude if it's actually from the root folder, not from src/
            if (assetInfo.name && assetInfo.name.includes(folder) && !assetInfo.name.includes('src/')) {
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
