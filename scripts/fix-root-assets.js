/**
 * Post-build script to fix root asset paths in bundled files
 * This ensures root assets (images, pages, fonts, etc.) are referenced from root, not bundled
 */

const fs = require('fs')
const path = require('path')

const rootAssetFolders = ['images', 'pages', 'fonts', 'styles', 'scripts', 'photos', 'magazines']
const distDir = path.join(__dirname, '..', 'dist')

// Helper to recursively get all files matching a pattern
function getFilesRecursive(dir, pattern, baseDir = dir) {
  const files = []
  if (!fs.existsSync(dir)) {
    console.warn(`[fix-root-assets] Directory does not exist: ${dir}`)
    return files
  }
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        // Skip hidden directories and node_modules
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          files.push(...getFilesRecursive(fullPath, pattern, baseDir))
        }
      } else if (entry.isFile()) {
        const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')
        // Simple pattern matching - check if file extension matches
        // pattern is a RegExp like /\.(jpg|jpeg|png|gif)$/i
        if (pattern.test(relativePath) || pattern.test(entry.name)) {
          files.push(relativePath)
        }
      }
    }
  } catch (err) {
    console.warn(`[fix-root-assets] Error reading directory ${dir}:`, err.message)
  }
  
  return files
}

// Generate photo files object for import.meta.glob replacement
function generatePhotoFilesObject() {
  const projectRoot = path.join(__dirname, '..')
  const photosPath = path.join(projectRoot, 'images', 'Photos')
  
  if (!fs.existsSync(photosPath)) {
    console.warn('[fix-root-assets] Photos folder not found:', photosPath)
    return '{}'
  }
  
  // Pattern to match image files
  const imagePattern = /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG)$/i
  const files = getFilesRecursive(photosPath, imagePattern, photosPath)
  
  // Filter out unitegallery
  const filteredFiles = files.filter(file => 
    !file.includes('unitegallery') && 
    !file.includes('UniteGallery')
  )
  
  // Filter to only numbered gallery folders
  const galleryFiles = filteredFiles.filter(file => {
    const parts = file.split('/')
    if (parts.length === 0) return false
    const galleryFolder = parts[0]
    return /^\d+\s+/.test(galleryFolder)
  })
  
  console.log(`[fix-root-assets] Found ${galleryFiles.length} photo files`)
  if (galleryFiles.length > 0) {
    console.log(`[fix-root-assets] Sample files:`, galleryFiles.slice(0, 3))
  }
  
  if (galleryFiles.length === 0) {
    console.warn(`[fix-root-assets] WARNING: No photo files found! Check if images/Photos folder exists and contains numbered gallery folders.`)
    return '{}'
  }
  
  // Generate the object with root-relative paths
  // The key must match what import.meta.glob would return in the original code
  // Original: import.meta.glob('../../../images/Photos/**/*.jpg')
  // Keys should be: '../../../images/Photos/folder/file.jpg'
  // The file variable contains relative path from Photos folder, e.g., "1 Early Years/C1.jpg"
  const entries = galleryFiles.map(file => {
    // Ensure file path doesn't start with / and normalize slashes
    // file is relative to Photos folder, e.g., "1 Early Years/C1.jpg"
    let normalizedFile = file.replace(/^\/+/, '').replace(/\/+/g, '/')
    
    // Key format: '../../../images/Photos/folder/file.jpg'
    // This must exactly match what the original import.meta.glob would return
    // Build path carefully - join parts and then normalize all slashes
    let keyPath = `../../../images/Photos/${normalizedFile}`
    keyPath = keyPath.replace(/\/+/g, '/') // Replace any multiple slashes with single
    const key = `'${keyPath}'`
    
    // Value format: '/images/Photos/folder/file.jpg'
    // This is the root-relative URL that will be used in the browser
    let valuePath = `/images/Photos/${normalizedFile}`
    valuePath = valuePath.replace(/\/+/g, '/') // Replace any multiple slashes with single
    const value = `'${valuePath}'`
    
    return `  ${key}: ${value}`
  }).join(',\n')
  
  // Log a sample entry to verify format
  if (entries.length > 0) {
    const firstEntry = entries.split(',\n')[0]
    console.log(`[fix-root-assets] Sample entry: ${firstEntry.substring(0, 100)}...`)
  }
  
  return `{\n${entries}\n}`
}

function fixAssetPaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let modified = false

  // Pattern: Match bundled assets like "/New/assets/hash-folder/file.ext"
  for (const folder of rootAssetFolders) {
    // Pattern 1: /New/assets/hash-folder/file.ext -> /folder/file.ext
    const pattern1 = new RegExp(
      `(['"])/New/assets/[a-zA-Z0-9_-]+-${folder}/([^'"]+)\\1`,
      'gi'
    )
    
    content = content.replace(pattern1, (match, quote, filePath) => {
      modified = true
      return `${quote}/${folder}/${filePath}${quote}`
    })

    // Pattern 2: /New/assets/hash-folder-subfolder/file.ext -> /folder/subfolder/file.ext
    const pattern2 = new RegExp(
      `(['"])/New/assets/[a-zA-Z0-9_-]+-${folder}([^'"]+)\\1`,
      'gi'
    )
    
    content = content.replace(pattern2, (match, quote, restOfPath) => {
      modified = true
      // Remove any leading dashes or slashes from restOfPath
      const cleanPath = restOfPath.replace(/^[-/]+/, '')
      return `${quote}/${folder}/${cleanPath}${quote}`
    })

    // Pattern 3: More generic - any path containing the folder name
    const pattern3 = new RegExp(
      `(['"])/New/assets/[^'"]*${folder}[^'"]*['"]`,
      'gi'
    )
    
    content = content.replace(pattern3, (match) => {
      // Try to extract the folder and file path
      const folderMatch = match.match(new RegExp(`${folder}(?:/|\\\\|[-_])([^'"]+)`, 'i'))
      if (folderMatch) {
        modified = true
        const filePath = folderMatch[1].replace(/^[a-zA-Z0-9_-]+-/, '') // Remove hash prefix
        const quote = match[0]
        return `${quote}/${folder}/${filePath}${quote}`
      }
      return match
    })
  }
  
  // Fix empty import.meta.glob results for Photos
  // Replace empty objects {} with actual photo file mappings
  // Look for the transformed import.meta.glob result that's an empty object
  if (content.includes("'../../../images/Photos") || content.includes('Photos/**/*') || content.includes('photoFiles') || content.includes('Photos') || content.includes('import.meta.glob')) {
    console.log(`[fix-root-assets] ========================================`)
    console.log(`[fix-root-assets] Processing: ${path.relative(distDir, filePath)}`)
    
    // Generate the photo files object first
    const photoFilesObj = generatePhotoFilesObject()
    const fileCount = photoFilesObj.split(',').length
    console.log(`[fix-root-assets] Generated photo files object with ${fileCount} entries`)
    
    // If no files found, skip this file
    if (fileCount === 0) {
      console.warn(`[fix-root-assets] WARNING: No photo files found to inject!`)
      console.warn(`[fix-root-assets] This means the post-build script cannot fix the issue.`)
      console.warn(`[fix-root-assets] Check that images/Photos folder exists with numbered gallery folders.`)
      return
    }
    
    // Create minified version for replacement
    const minifiedObj = photoFilesObj.replace(/\n/g, '').replace(/\s+/g, ' ')
    console.log(`[fix-root-assets] Minified object length: ${minifiedObj.length} chars`)
    
    // Strategy: Find ALL empty objects {} and check context to identify photoFiles
    // This is more reliable than trying to match variable names which might be minified
    
    let found = false
    let replacementCount = 0
    
    // Pattern 1: Look for empty object {} that appears before Photos-related code
    // This works even if variable names are minified
    const emptyObjRegex = /\{\s*\}/g
    const matches = []
    let match
    
    // Collect all empty object matches
    while ((match = emptyObjRegex.exec(content)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        before: content.substring(Math.max(0, match.index - 200), match.index),
        after: content.substring(match.index + match[0].length, Math.min(content.length, match.index + match[0].length + 300))
      })
    }
    
    console.log(`[fix-root-assets] Found ${matches.length} empty object patterns in file`)
    
    // Process matches in reverse order to avoid index shifting
    for (let i = matches.length - 1; i >= 0; i--) {
      const m = matches[i]
      
      // Check if this empty object is likely photoFiles based on context
      const hasPhotosContext = (
        m.before.includes('Photos') || 
        m.before.includes('photoFiles') ||
        m.before.match(/[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*$/) || // variable assignment before
        m.before.includes('import.meta.glob')
      ) && (
        m.after.includes('Photos') ||
        m.after.includes('gallery') ||
        m.after.includes('getGalleryData') ||
        m.after.includes('Object.keys') ||
        m.after.includes('Object.values') ||
        m.after.match(/\.(length|forEach|map|filter)/) // array/object methods
      )
      
      if (hasPhotosContext) {
        console.log(`[fix-root-assets] ✓ Found photoFiles empty object at position ${m.index}`)
        console.log(`[fix-root-assets] Before: ...${m.before.substring(Math.max(0, m.before.length - 60))}`)
        console.log(`[fix-root-assets] After: ${m.after.substring(0, 60)}...`)
        
        // Replace the empty object
        content = content.substring(0, m.index) + minifiedObj + content.substring(m.index + m.length)
        modified = true
        found = true
        replacementCount++
        console.log(`[fix-root-assets] ✓ Successfully replaced with ${fileCount} photo file paths`)
        break // Only replace the first match (should be photoFiles)
      }
    }
    
    // Pattern 2: Fallback - try named patterns (for unminified code)
    if (!found) {
      const emptyPhotoFilesPatterns = [
        /(const\s+photoFiles\s*=\s*)\{\s*\}/g,
        /(let\s+photoFiles\s*=\s*)\{\s*\}/g,
        /(var\s+photoFiles\s*=\s*)\{\s*\}/g,
        /(photoFiles\s*=\s*)\{\s*\}/g
      ]
      
      for (const pattern of emptyPhotoFilesPatterns) {
        if (pattern.test(content)) {
          console.log(`[fix-root-assets] ✓ Found named photoFiles pattern`)
          content = content.replace(pattern, `$1${photoFilesObj}`)
          modified = true
          found = true
          replacementCount++
          console.log(`[fix-root-assets] ✓ Injected ${fileCount} photo file paths`)
          break
        }
      }
    }
    
    if (!found) {
      console.error(`[fix-root-assets] ✗ FAILED: Could not find empty photoFiles object to replace!`)
      console.error(`[fix-root-assets] File: ${path.relative(distDir, filePath)}`)
      console.error(`[fix-root-assets] File size: ${content.length} bytes`)
      console.error(`[fix-root-assets] Contains 'Photos': ${content.includes('Photos')}`)
      console.error(`[fix-root-assets] Contains 'photoFiles': ${content.includes('photoFiles')}`)
      console.error(`[fix-root-assets] Contains 'import.meta.glob': ${content.includes('import.meta.glob')}`)
      
      // Try to find where Photos code is
      const photosIndex = content.indexOf('Photos')
      const photoFilesIndex = content.indexOf('photoFiles')
      const globIndex = content.indexOf('import.meta.glob')
      
      const searchIndex = photosIndex > 0 ? photosIndex : (photoFilesIndex > 0 ? photoFilesIndex : (globIndex > 0 ? globIndex : 0))
      
      if (searchIndex > 0) {
        const sample = content.substring(Math.max(0, searchIndex - 150), Math.min(content.length, searchIndex + 300))
        console.error(`[fix-root-assets] Sample content (${searchIndex}):`)
        console.error(`[fix-root-assets] ${sample}`)
        
        // Try one more time with a very simple pattern - just find {} near Photos
        const simplePattern = /\{\s*\}/g
        let simpleMatch
        while ((simpleMatch = simplePattern.exec(content)) !== null) {
          const dist = Math.abs(simpleMatch.index - searchIndex)
          if (dist < 500) {
            console.log(`[fix-root-assets] Attempting last-resort replacement at position ${simpleMatch.index} (distance: ${dist})`)
            content = content.substring(0, simpleMatch.index) + minifiedObj + content.substring(simpleMatch.index + simpleMatch[0].length)
            modified = true
            found = true
            replacementCount++
            console.log(`[fix-root-assets] ✓ Last-resort replacement successful`)
            break
          }
        }
      }
    }
    
    console.log(`[fix-root-assets] ========================================`)
    console.log(`[fix-root-assets] Result: ${found ? 'SUCCESS' : 'FAILED'} (${replacementCount} replacements)`)
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Fixed asset paths in: ${path.relative(distDir, filePath)}`)
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      processDirectory(filePath)
    } else if (file.endsWith('.js') || file.endsWith('.css')) {
      fixAssetPaths(filePath)
    }
  }
}

// Run the fix
if (fs.existsSync(distDir)) {
  console.log('='.repeat(60))
  console.log('Fixing root asset paths in dist/...')
  console.log('='.repeat(60))
  
  // First, verify photos folder exists
  const photosPath = path.join(__dirname, '..', 'images', 'Photos')
  console.log(`[fix-root-assets] Checking photos folder: ${photosPath}`)
  console.log(`[fix-root-assets] Photos folder exists: ${fs.existsSync(photosPath)}`)
  
  if (fs.existsSync(photosPath)) {
    try {
      const dirs = fs.readdirSync(photosPath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
      console.log(`[fix-root-assets] Gallery folders found: ${dirs.length}`)
      if (dirs.length > 0) {
        console.log(`[fix-root-assets] Sample folders:`, dirs.slice(0, 5))
      }
    } catch (e) {
      console.warn(`[fix-root-assets] Could not read Photos folder:`, e.message)
    }
  }
  
  processDirectory(path.join(distDir, 'assets'))
  console.log('='.repeat(60))
  console.log('Done!')
  console.log('='.repeat(60))
} else {
  console.error('dist/ directory not found. Run "npm run build" first.')
  process.exit(1)
}
