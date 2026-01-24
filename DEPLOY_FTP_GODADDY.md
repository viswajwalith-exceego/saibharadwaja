# Deploy React App to GoDaddy via FTP - Complete Guide

## 📋 Overview

Your React app references assets from root folders (`/images/`, `/pages/`, `/fonts/`, `/styles/`, etc.) that are located at the root level of your server. This guide explains how to deploy your React app to the `/New/` subdirectory while referencing these root-level assets.

**Important**: 
- Your React app is deployed to the `/New/` subdirectory on GoDaddy
- Static assets (images, pages, fonts, etc.) remain at root level (`public_html/images/`, `public_html/pages/`, etc.)
- The build process does NOT copy these folders - they should already exist on your server

---

## 🔧 Step 1: Build Configuration Check

The `vite.config.js` is configured to:
- ✅ Preserve root-relative asset paths (paths starting with `/images/`, `/pages/`, etc. remain root-relative)
- ✅ Use `base: '/New/'` for React Router routing
- ✅ `.htaccess` file in `public/` folder (copied automatically to `dist/`)

**Note**: Root folders (`images/`, `pages/`, `fonts/`, etc.) are NOT copied to `dist/` during build. These should already exist at root level on your server.

---

## 🏗️ Step 2: Build Your React Application

1. **Open terminal/command prompt** in your project root:
   ```bash
   cd C:\Personal\Saibharadwaja_org
   ```

2. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Verify build output**:
   - Check that `dist/` folder contains:
     - `index.html`
     - `assets/` folder (JS, CSS files)
     - `.htaccess` file (from `public/` folder)
   
   **Note**: Root folders (`images/`, `pages/`, `fonts/`, `styles/`, `scripts/`, `photos/`, `magazines/`) are NOT in `dist/`. These should already exist at root level on your server (`public_html/images/`, `public_html/pages/`, etc.).

---

## 📤 Step 3: Get FTP Credentials from GoDaddy

1. **Log in to GoDaddy** account
2. **Go to your hosting dashboard**
3. **Click "cPanel"** or "Manage Hosting"
4. **Find "FTP Accounts"** section
5. **Note your FTP details**:
   - **FTP Host**: Usually `ftp.yourdomain.com` or an IP address
   - **FTP Username**: Your FTP username
   - **FTP Password**: Your FTP password
   - **Port**: Usually `21` (or `22` for SFTP)

---

## 🔌 Step 4: Connect via FTP Client

### Option A: Using FileZilla (Recommended - Free)

1. **Download FileZilla**: https://filezilla-project.org/

2. **Install and open FileZilla**

3. **Connect to GoDaddy**:
   - **Host**: `ftp.yourdomain.com` (or IP from GoDaddy)
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: `21`
   - Click **"Quickconnect"**

4. **Navigate to `public_html/New`**:
   - In the **Remote site** panel (right side), navigate to `public_html/`
   - Create or navigate to `New/` directory
   - This is where your React app will be deployed

---

## 📁 Step 5: Upload Files via FTP

### Important: Backup First!

1. **Backup existing website** (if any):
   - In FileZilla, select all files in `public_html/`
   - Right-click → **Download** to backup locally

2. **Navigate to `New` directory**:
   - In `public_html/`, create `New/` if it doesn't exist
   - Navigate into `New/`

3. **Delete old files** (if replacing existing site):
   - Select all files in `public_html/New/`
   - Right-click → **Delete**

4. **Upload React app files from `dist` folder**:
   - In FileZilla **Local site** panel (left side), navigate to:
     ```
     C:\Personal\Saibharadwaja_org\dist
     ```
   - Select **ALL files and folders** in `dist/` (this includes `index.html`, `assets/`, `.htaccess`)
   - **Drag and drop** to `public_html/New/` on the right side
   - Wait for upload to complete
   
   **Important**: Do NOT upload root folders (`images/`, `pages/`, `fonts/`, etc.) from your local project. These should already exist at `public_html/images/`, `public_html/pages/`, etc.` on your server.

4. **Verify `.htaccess` file**:
   - In FileZilla, go to **Server** → **Force show hidden files**
   - Make sure `.htaccess` is uploaded
   - If missing, upload it manually

---

## ✅ Step 6: Set File Permissions

1. **Right-click on files** in `public_html/New/`:
   - **Files**: Set permissions to `644`
   - **Folders**: Set permissions to `755`

2. **Special permissions for `.htaccess`**:
   - Right-click `.htaccess` → **File permissions** → `644`

---

## 🧪 Step 7: Test Your Deployment

1. **Visit your domain**: `https://yourdomain.com/New/`

2. **Test all routes**:
   - Home: `https://yourdomain.com/New/`
   - Books: `https://yourdomain.com/New/books`
   - Purchase: `https://yourdomain.com/New/books/purchase`
   - Speeches: `https://yourdomain.com/New/media/speeches-videos`
   - Photos: `https://yourdomain.com/New/media/photos`

3. **Check browser console** (F12):
   - Look for any 404 errors
   - Verify images load correctly
   - Check CSS files load

4. **Test image paths**:
   - Verify `/images/` folder assets load
   - Verify `/pages/sbmedia/` media files load
   - Verify `/fonts/` load correctly

---

## 🔍 Troubleshooting

### Issue: Images not loading (404 errors)

**Solution**:
1. Verify `images/` folder exists at root level: `public_html/images/` (NOT in `New/` folder)
2. Check file paths in browser DevTools Network tab (should be `/images/...` - root-relative, NOT `/New/images/...`)
3. Verify file permissions on root folders (should be 644 for files, 755 for folders)
4. Ensure root asset paths in code use absolute paths starting with `/` (e.g., `/images/logo.png`)
5. Verify `base: '/New/'` in `vite.config.js` (this only affects React Router, not root asset paths)

### Issue: React Router routes return 404

**Solution**:
1. Verify `.htaccess` file is uploaded in `New folder/`
2. Check `.htaccess` has `RewriteBase /New folder/` (not just `/`)
3. Check `.htaccess` permissions (644)
4. Ensure mod_rewrite is enabled on GoDaddy (contact support if needed)
5. Verify `base: '/New folder/'` in `vite.config.js`

### Issue: CSS files not loading

**Solution**:
1. Check `styles/` folder exists at root level: `public_html/styles/` (NOT in `New/` folder)
2. Verify CSS file paths in `dist/index.html` (React app CSS should be in `/New/assets/...`, but root CSS references should be `/styles/...`)
3. Check browser console for specific file errors
4. Verify root CSS paths use absolute paths starting with `/` (e.g., `/styles/main.css`)

### Issue: Audio/Video files not playing

**Solution**:
1. Verify `pages/sbmedia/` folder is uploaded completely
2. Check file sizes (large files may timeout during upload)
3. Verify file permissions (644 for files, 755 for folders)

### Issue: Fonts not loading

**Solution**:
1. Verify `fonts/` folder is uploaded
2. Check font file paths in CSS
3. Verify CORS headers if needed (contact GoDaddy support)

---

## 📝 Quick Checklist

Before deploying:
- [ ] Built production version (`npm run build`)
- [ ] Verified `dist/` folder contains React app files (`index.html`, `assets/`, `.htaccess`)
- [ ] Verified root asset folders exist on server at `public_html/images/`, `public_html/pages/`, etc.
- [ ] Got FTP credentials from GoDaddy
- [ ] Installed FTP client (FileZilla)

During deployment:
- [ ] Backed up existing website
- [ ] Connected to GoDaddy via FTP
- [ ] Navigated to `public_html/New/` directory
- [ ] Created `New/` if it doesn't exist
- [ ] Uploaded ALL files from `dist/` folder to `New/`
- [ ] Verified `.htaccess` is uploaded in `New/`
- [ ] Set file permissions (644 for files, 755 for folders)

After deployment:
- [ ] Tested website at `https://yourdomain.com/New/`
- [ ] Tested all routes (with `/New/` prefix)
- [ ] Verified images load
- [ ] Verified CSS loads
- [ ] Verified fonts load
- [ ] Tested audio/video playback
- [ ] Checked browser console for errors
- [ ] Verified all asset paths include `/New/` prefix

---

## 🚀 Alternative: Using GoDaddy File Manager

If you prefer not to use FTP:

1. **Log in to GoDaddy cPanel**
2. **Open "File Manager"**
3. **Navigate to `public_html/`**
4. **Create `New` directory** (if it doesn't exist)
5. **Navigate into `New/`**
6. **Upload files**:
   - Click "Upload" button
   - Select all files from `dist/` folder
   - Wait for upload
7. **Enable "Show Hidden Files"** in File Manager settings
8. **Verify `.htaccess` is uploaded in `New/`**

---

## 📦 What Gets Copied During Build

The build process automatically copies:
- ✅ `images/` → `dist/images/`
- ✅ `pages/` → `dist/pages/`
- ✅ `fonts/` → `dist/fonts/`
- ✅ `styles/` → `dist/styles/`
- ✅ `scripts/` → `dist/scripts/`
- ✅ `photos/` → `dist/photos/`
- ✅ `magazines/` → `dist/magazines/`
- ✅ `sbfavicon.ico` → `dist/sbfavicon.ico`
- ✅ `sbHeaderMenu923.html` → `dist/sbHeaderMenu923.html`
- ✅ `.htaccess` from `public/` → `dist/.htaccess`

All these will be in your `dist/` folder after build and should be uploaded to `public_html/New/` on GoDaddy.

**Important**: The `base: '/New/'` setting in `vite.config.js` ensures all asset paths are correctly prefixed with `/New/`.

---

## 💡 Tips

1. **Large Files**: If you have large video/audio files, consider uploading them separately or using a CDN
2. **Upload Time**: First upload may take time depending on file sizes
3. **Incremental Updates**: For future updates, only upload changed files
4. **Test Locally First**: Use `npm run preview` to test the `dist/` folder locally before uploading

---

## 📞 Need Help?

- **GoDaddy Support**: Contact GoDaddy for FTP/hosting issues
- **Build Issues**: Check Vite documentation
- **React Router**: Check React Router documentation for routing issues

---

**Note**: 
- The `base: '/New/'` in `vite.config.js` only affects React Router routing, NOT root asset paths
- Your image/media references using absolute paths (e.g., `/images/...`) remain root-relative and resolve to `public_html/images/...` on the server
- Root asset folders should already exist on your server at root level
- After deployment, access your site at: `https://yourdomain.com/New/`
