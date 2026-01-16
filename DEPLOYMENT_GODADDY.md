# Deploying React App to GoDaddy - Step by Step Guide

## Prerequisites
- GoDaddy hosting account with cPanel access
- FTP credentials (or File Manager access)
- Your React app built and ready

---

## Step 1: Build Your React Application for Production

1. **Open your terminal/command prompt** in your project directory

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Build the production version**:
   ```bash
   npm run build
   ```

4. This will create a `dist` folder containing all the optimized production files.

---

## Step 2: Create .htaccess File for React Router

Since you're using React Router, you need an `.htaccess` file to handle client-side routing. 

**Create a file named `.htaccess` in your `dist` folder** with the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures that all routes are handled by your React app and prevents 404 errors when users navigate directly to routes like `/books/purchase`.

---

## Step 3: Prepare Files for Upload

1. **Navigate to the `dist` folder** in your project
2. **Copy the `.htaccess` file** you created into the `dist` folder
3. **Verify all files are present**:
   - `index.html`
   - `assets/` folder (with JS, CSS files)
   - `.htaccess` file
   - Any static files from `public/` folder (images, fonts, etc.)

---

## Step 4: Access GoDaddy cPanel

1. **Log in to your GoDaddy account**
2. **Go to your hosting dashboard**
3. **Click on "cPanel"** or "Manage Hosting"
4. **Find and open "File Manager"**

---

## Step 5: Upload Files to GoDaddy

### Option A: Using File Manager (Recommended for beginners)

1. **Navigate to `public_html` folder** (or your domain's root folder)
   - For main domain: `public_html/`
   - For subdomain: `public_html/subdomain_name/`

2. **Backup existing files** (if any):
   - Select all existing files
   - Right-click → Compress → Download the backup

3. **Delete old files** (if replacing an old site):
   - Select all files in `public_html`
   - Click "Delete"

4. **Upload your files**:
   - Click "Upload" button
   - Select all files from your `dist` folder
   - Wait for upload to complete

5. **Verify `.htaccess` file**:
   - Make sure `.htaccess` is uploaded (it might be hidden)
   - In File Manager, enable "Show Hidden Files" (usually in Settings)

### Option B: Using FTP Client (FileZilla, WinSCP, etc.)

1. **Get FTP credentials** from GoDaddy cPanel:
   - Go to cPanel → FTP Accounts
   - Note your FTP host, username, and password

2. **Connect via FTP client**:
   - Host: `ftp.yourdomain.com` or IP address
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)

3. **Navigate to `public_html`** on the server

4. **Upload all files** from your `dist` folder to `public_html`

5. **Set permissions** (if needed):
   - Files: 644
   - Folders: 755
   - `.htaccess`: 644

---

## Step 6: Update File Paths (if needed)

If your assets are not loading correctly, you may need to update the base path in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',  // Change to '/subfolder/' if deploying to a subfolder
  build: {
    outDir: 'dist'
  }
})
```

Then rebuild:
```bash
npm run build
```

---

## Step 7: Test Your Deployment

1. **Visit your domain** in a browser
2. **Test all routes**:
   - Home page: `https://yourdomain.com/`
   - Books: `https://yourdomain.com/books`
   - Purchase: `https://yourdomain.com/books/purchase`
   - Other routes

3. **Check browser console** for any errors
4. **Test navigation** between pages

---

## Step 8: Configure Domain (if needed)

If you're using a custom domain:

1. **Go to GoDaddy DNS settings**
2. **Point your domain** to your hosting:
   - A Record: `@` → Your hosting IP
   - CNAME: `www` → `yourdomain.com`

---

## Troubleshooting

### Issue: 404 errors on direct route access
**Solution**: Make sure `.htaccess` file is uploaded and has correct permissions (644)

### Issue: Assets not loading (404 on CSS/JS files)
**Solution**: 
- Check that `assets/` folder is uploaded
- Verify file paths in browser DevTools Network tab
- Rebuild with correct `base` path in `vite.config.js`

### Issue: White screen
**Solution**:
- Check browser console for errors
- Verify `index.html` is in root
- Check that all files uploaded successfully
- Verify `.htaccess` is working

### Issue: Slow loading
**Solution**:
- Enable gzip compression in `.htaccess`
- Optimize images before upload
- Consider using a CDN

---

## Additional .htaccess Optimizations

You can add these to your `.htaccess` for better performance:

```apache
# Enable Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
</IfModule>
```

---

## Quick Checklist

- [ ] Built production version (`npm run build`)
- [ ] Created `.htaccess` file in `dist` folder
- [ ] Backed up existing website (if any)
- [ ] Uploaded all files from `dist` to `public_html`
- [ ] Verified `.htaccess` is uploaded
- [ ] Tested website in browser
- [ ] Tested all routes
- [ ] Checked browser console for errors

---

## Need Help?

- **GoDaddy Support**: Contact GoDaddy support for hosting-specific issues
- **React Router Issues**: Check React Router documentation
- **Build Issues**: Check Vite documentation

---

**Note**: If you're deploying to a subfolder (not root), you'll need to:
1. Set `base: '/subfolder/'` in `vite.config.js`
2. Rebuild the app
3. Upload to `public_html/subfolder/`
