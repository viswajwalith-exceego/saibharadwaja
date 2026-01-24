# Complete Deployment Guide - React App to /New/ Folder

## Overview
Deploy your React app to `yourdomain.com/New/` while keeping all assets (images, photos, PDFs, fonts) in root folders. Menu navigation will work correctly, and you can easily move to root level later.

## Configuration Summary

### Current Setup
- ✅ React app: Deployed to `/New/` subdirectory
- ✅ Assets: Stay at root level (`/images/`, `/pages/`, `/fonts/`, etc.)
- ✅ React Router: Configured with `basename="/New"`
- ✅ Vite base: Set to `/New/`
- ✅ Menu links: Use React Router `Link` components (work automatically)

## Step-by-Step Deployment

### Step 1: Build the React App
```bash
npm run build
```

This creates:
- `dist/index.html`
- `dist/assets/` (JavaScript and CSS bundles only)
- `dist/.htaccess` (Apache configuration)

**Important**: Root folders (`images/`, `pages/`, `fonts/`, etc.) are NOT copied to `dist/`.

### Step 2: Verify Build Output
Check `dist/` folder contains:
- ✅ `index.html`
- ✅ `assets/` folder (with `index-*.js` and `index-*.css` files)
- ✅ `.htaccess` file

**Do NOT expect**:
- ❌ `images/` folder
- ❌ `pages/` folder
- ❌ `fonts/` folder
- ❌ Other root asset folders

### Step 3: Connect via FTP
1. Use FileZilla or your FTP client
2. Connect to GoDaddy using your FTP credentials
3. Navigate to `public_html/`

### Step 4: Upload React App Files
1. **Create `New/` folder** in `public_html/` (if it doesn't exist)
2. **Navigate to** `public_html/New/`
3. **Upload ALL files from `dist/`**:
   - `index.html`
   - `assets/` folder (entire folder)
   - `.htaccess` file

**Do NOT upload**:
- Root folders from your local project
- Any files from `src/` folder

### Step 5: Verify Root Assets Exist
Ensure these folders exist at root level on your server:
- ✅ `public_html/images/`
- ✅ `public_html/pages/`
- ✅ `public_html/fonts/`
- ✅ `public_html/styles/`
- ✅ `public_html/scripts/` (if needed)
- ✅ `public_html/photos/` (if needed)
- ✅ `public_html/magazines/` (if needed)

If they don't exist, upload them separately to root level.

### Step 6: Set File Permissions
- **Files**: `644`
- **Folders**: `755`

### Step 7: Test Your Site
Visit: `https://yourdomain.com/New/`

**Test**:
- ✅ Home page loads
- ✅ Menu links navigate correctly
- ✅ Images load from root (`/images/...`)
- ✅ Audio/video files load from root (`/pages/...`)
- ✅ Fonts load from root (`/fonts/...`)
- ✅ No 404 errors in browser console

## How It Works

### Asset Paths
- **Root assets** (images, fonts, etc.): Referenced as `/images/...`, `/fonts/...` (root-relative)
- **React app assets**: Bundled in `/New/assets/...`
- **Menu links**: Use React Router `Link` components, automatically work with `/New/` base

### File Structure on Server
```
public_html/
├── New/                    ← React app here
│   ├── index.html
│   ├── assets/
│   │   ├── index-*.js
│   │   └── index-*.css
│   └── .htaccess
├── images/                 ← Root assets (not in dist/)
├── pages/                  ← Root assets (not in dist/)
├── fonts/                  ← Root assets (not in dist/)
├── styles/                 ← Root assets (not in dist/)
└── ... (other root folders)
```

## Moving to Root Level Later

If you want to deploy React app at root (`yourdomain.com/`) instead of `/New/`:

### Step 1: Update Configuration
1. **`vite.config.js`**: Change `base: '/New/'` → `base: '/'`
2. **`src/main.jsx`**: Change `ROUTER_BASENAME = "/New"` → `ROUTER_BASENAME = ""`
3. **`public/.htaccess`**: Change `RewriteBase /New/` → `RewriteBase /` and `RewriteRule . /New/index.html` → `RewriteRule . /index.html`

### Step 2: Rebuild and Deploy
```bash
npm run build
```

Upload `dist/` contents to `public_html/` (root level, not in `New/` folder).

## Troubleshooting

### Issue: 404 errors for `/New/assets/...`
**Solution**: 
- Verify files were uploaded to `public_html/New/assets/`
- Check file permissions (644 for files)
- Clear browser cache

### Issue: Images not loading
**Solution**:
- Verify `images/` folder exists at `public_html/images/` (root level)
- Check image paths in code use `/images/...` (root-relative)
- Verify file permissions

### Issue: Menu links not working
**Solution**:
- Verify `basename="/New"` in `src/main.jsx`
- Check that links use React Router `Link` component (not `<a href>`)
- Verify `.htaccess` is uploaded and has correct permissions

### Issue: Fonts not loading
**Solution**:
- Verify `fonts/` folder exists at `public_html/fonts/` (root level)
- Check CSS font paths use `/fonts/...` (root-relative)
- Verify font files have correct permissions

## Quick Checklist

Before deployment:
- [ ] Built app: `npm run build`
- [ ] Verified `dist/` contains only React app files
- [ ] Verified root asset folders exist on server

During deployment:
- [ ] Created `New/` folder in `public_html/`
- [ ] Uploaded `dist/index.html` to `public_html/New/`
- [ ] Uploaded `dist/assets/` folder to `public_html/New/`
- [ ] Uploaded `dist/.htaccess` to `public_html/New/`
- [ ] Set file permissions (644/755)

After deployment:
- [ ] Tested `https://yourdomain.com/New/`
- [ ] Tested all menu links
- [ ] Verified images load
- [ ] Verified fonts load
- [ ] Checked browser console for errors

## Configuration Files

### `vite.config.js`
- `base: '/New/'` - App deployed to `/New/` subdirectory
- `serveRootAssets()` - Serves root assets from root during dev
- `preserveRootAssetPaths()` - Ensures root asset paths stay root-relative

### `src/main.jsx`
- `ROUTER_BASENAME = "/New"` - React Router base path
- Change to `""` when moving to root

### `public/.htaccess`
- `RewriteBase /New/` - Apache rewrite base
- `RewriteRule . /New/index.html` - Fallback to React app

## Summary

✅ **React app**: `public_html/New/`  
✅ **Root assets**: `public_html/images/`, `public_html/pages/`, etc.  
✅ **Menu navigation**: Works automatically with React Router  
✅ **Future migration**: Just change 3 config values to move to root
