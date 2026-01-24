# Quick FTP Deployment Guide - GoDaddy

## 🚀 5-Minute Deployment

**Important**: 
- Your app is deployed to `/New/` subdirectory
- Root asset folders (`images/`, `pages/`, `fonts/`, etc.) should already exist at root level on your server
- Only React app files from `dist/` need to be uploaded

### Step 1: Build
```bash
npm run build
```

### Step 2: Get FTP Info
- GoDaddy cPanel → FTP Accounts
- Note: Host, Username, Password

### Step 3: Connect FTP
- Use FileZilla (free)
- Connect to GoDaddy FTP

### Step 4: Upload
- Navigate to `public_html/New/` on server
- Create `New/` if it doesn't exist
- Upload React app files from `dist/` folder (`index.html`, `assets/`, `.htaccess`)
- **Do NOT upload root folders** - they should already exist at `public_html/images/`, `public_html/pages/`, etc.

### Step 5: Test
- Visit: `https://yourdomain.com/New/`
- Test all pages (routes will have `/New/` prefix)

---

## ✅ What Gets Built

The build creates React app files in `dist/`:
- `index.html` - Main HTML file
- `assets/` - JavaScript and CSS bundles
- `.htaccess` - Apache configuration (from `public/`)

**Root folders are NOT copied** - they should already exist on your server at:
- `public_html/images/`
- `public_html/pages/`
- `public_html/fonts/`
- `public_html/styles/`
- `public_html/scripts/`
- `public_html/photos/`
- `public_html/magazines/`

---

## 📋 Upload Checklist

After `npm run build`, verify `dist/` contains:
- [ ] `index.html`
- [ ] `assets/` folder
- [ ] `.htaccess` file

**Verify root folders exist on server** (should already be there):
- [ ] `public_html/images/` exists
- [ ] `public_html/pages/` exists
- [ ] `public_html/fonts/` exists
- [ ] `public_html/styles/` exists
- [ ] `public_html/scripts/` exists (if needed)
- [ ] `public_html/photos/` exists (if needed)
- [ ] `public_html/magazines/` exists (if needed)

Then upload only the React app files from `dist/` to `public_html/New/` on GoDaddy.

---

## ⚠️ Important Notes

1. **Root folders are NOT copied during build** - they should already exist at root level on your server
2. **Upload only React app files from `dist/`** to `public_html/New/` (`index.html`, `assets/`, `.htaccess`)
3. **Make sure `.htaccess` is uploaded** in `New/` (enable "Show Hidden Files" in FileZilla)
4. **Set permissions**: Files = 644, Folders = 755
5. **Base path `/New/` only affects React Router** - root asset paths (like `/images/...`) remain root-relative
6. **Access your site at**: `https://yourdomain.com/New/`
7. **Root asset paths** (e.g., `/images/logo.png`) resolve to `public_html/images/logo.png` on the server

---

See `DEPLOY_FTP_GODADDY.md` for detailed instructions.
