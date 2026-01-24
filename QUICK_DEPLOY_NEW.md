# Quick Deploy to /New/ Folder

## Build & Deploy

```bash
npm run build
```

## Upload to Server

1. **FTP to GoDaddy** → `public_html/`
2. **Create `New/` folder** (if needed)
3. **Upload from `dist/`**:
   - `index.html` → `public_html/New/index.html`
   - `assets/` folder → `public_html/New/assets/`
   - `.htaccess` → `public_html/New/.htaccess`

## Verify Root Assets

Make sure these exist at root level:
- `public_html/images/`
- `public_html/pages/`
- `public_html/fonts/`
- `public_html/styles/`

## Test

Visit: `https://yourdomain.com/New/`

## Configuration

- ✅ `base: '/New/'` in `vite.config.js`
- ✅ `basename="/New"` in `src/main.jsx`
- ✅ `.htaccess` configured for `/New/`
- ✅ Menu links use React Router (work automatically)

## Move to Root Later?

Change 3 values:
1. `vite.config.js`: `base: '/'`
2. `src/main.jsx`: `ROUTER_BASENAME = ""`
3. `public/.htaccess`: `RewriteBase /` and `RewriteRule . /index.html`

Then rebuild and upload to `public_html/` (root).
