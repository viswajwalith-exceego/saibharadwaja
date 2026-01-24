/**
 * Post-build script to fix root asset paths in bundled files
 * This ensures root assets (images, pages, fonts, etc.) are referenced from root, not bundled
 */

const fs = require('fs')
const path = require('path')

const rootAssetFolders = ['images', 'pages', 'fonts', 'styles', 'scripts', 'photos', 'magazines']
const distDir = path.join(__dirname, '..', 'dist')

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
  console.log('Fixing root asset paths in dist/...')
  processDirectory(path.join(distDir, 'assets'))
  console.log('Done!')
} else {
  console.error('dist/ directory not found. Run "npm run build" first.')
  process.exit(1)
}
