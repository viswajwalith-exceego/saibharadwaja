# Rollback Instructions - Remove React App from /New/ Folder

## Current Situation
You've renamed/removed the "New" folder on the server, but the site is still trying to load resources from `/New/assets/`, causing 404 errors.

## Steps to Rollback

### Option 1: Completely Remove React App from Server

1. **Connect via FTP** to GoDaddy
2. **Navigate to** `public_html/`
3. **Delete the entire `New/` folder** (if it still exists)
4. **Delete any React-related files** at root level:
   - Any `index.html` that references React
   - Any `assets/` folders that contain React bundles
   - Any `.htaccess` files that have React Router rules

### Option 2: Keep React App but Deploy at Root Level

If you want to keep the React app but deploy it at root (`yourdomain.com/` instead of `yourdomain.com/New/`):

1. **Update configuration** (already done):
   - ✅ `vite.config.js` - Changed `base: '/'`
   - ✅ `public/.htaccess` - Updated to root paths
   - ✅ `src/main.jsx` - Removed basename

2. **Rebuild the app**:
   ```bash
   npm run build
   ```

3. **Upload to root level**:
   - Connect via FTP
   - Navigate to `public_html/` (root level, NOT in a subfolder)
   - Upload ALL files from `dist/` folder:
     - `index.html`
     - `assets/` folder
     - `.htaccess` file

4. **Clean up old files**:
   - Delete `public_html/New/` folder completely
   - Remove any old React files at root

## What to Delete on Server

### Files/Folders to Remove:
- ✅ `public_html/New/` (entire folder)
- ✅ Any `index.html` that references `/New/assets/`
- ✅ Any old `assets/` folders with React bundles
- ✅ Any `.htaccess` files with `/New/` references

### Files/Folders to Keep:
- ✅ `public_html/images/` (your root images)
- ✅ `public_html/pages/` (your root pages/media)
- ✅ `public_html/fonts/` (your root fonts)
- ✅ `public_html/styles/` (your root styles)
- ✅ All other root asset folders

## Quick Rollback Steps

1. **FTP to GoDaddy**
2. **Go to** `public_html/`
3. **Delete** `New/` folder (if exists)
4. **Check for** any `index.html` files that reference `/New/`
5. **Delete** those files
6. **Done!** Your original site should work again

## If You Want to Deploy React at Root Later

After cleaning up, if you want to deploy React at root level:

1. Make sure config is set to `base: '/'` (already done)
2. Build: `npm run build`
3. Upload `dist/` contents to `public_html/` (root)
4. Make sure `.htaccess` is uploaded

## Verification

After rollback:
- Visit `https://saibharadwaja.org/` - should show your original site
- No 404 errors for `/New/assets/` paths
- Browser console should be clean (or show only original site errors)
