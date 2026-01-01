# Setup and Run Instructions

## Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

To check if you have them installed, run:
```bash
node --version
npm --version
```

## Step-by-Step Setup

### Step 1: Install Dependencies

Open a terminal/command prompt in the project root directory and run:

```bash
npm install
```

This will install all the required packages listed in `package.json`:
- React and React DOM
- React Router DOM
- Bootstrap
- Vite (build tool)
- TypeScript types

**Expected output:** You should see a `node_modules` folder created in your project directory.

### Step 2: Verify Project Structure

Make sure your project has the following structure:
```
Saibharadwaja_org/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── public/ (or root directory for static assets)
│   ├── images/
│   ├── fonts/
│   ├── magazines/
│   └── sbfavicon.ico
├── styles/ (original CSS files)
├── index.html
├── package.json
└── vite.config.js
```

### Step 3: Ensure Static Assets Are Accessible

The React app expects static assets (images, fonts, PDFs) to be accessible. You have two options:

**Option A: Keep assets in root directory (current setup)**
- Images should be in `/images/` folder
- Fonts should be in `/fonts/` folder
- Magazines should be in `/magazines/` folder
- These will be served from the root when running Vite

**Option B: Move assets to public folder (recommended)**
- Create a `public` folder in the project root
- Move `images/`, `fonts/`, `magazines/` folders into `public/`
- Vite will automatically serve files from `public/` at the root URL

### Step 4: Start the Development Server

Run the following command:

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Open in Browser

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the Saibharadwaja.org homepage!

## Troubleshooting

### Issue: Port 3000 is already in use

**Solution:** Vite will automatically try the next available port (3001, 3002, etc.), or you can specify a different port:

```bash
npm run dev -- --port 3001
```

### Issue: Module not found errors

**Solution:** 
1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again

### Issue: Images/fonts not loading

**Solution:**
1. Check that the asset paths in your components match the actual file locations
2. Ensure assets are in the `public/` folder or root directory
3. Check browser console for 404 errors to see which files are missing

### Issue: Bootstrap components (carousel, accordion) not working

**Solution:**
- Bootstrap JS is included in `index.html` via CDN
- Make sure you have an internet connection for the CDN to load
- Alternatively, install Bootstrap JS via npm:
  ```bash
  npm install bootstrap
  ```
  Then import it in `src/main.jsx`:
  ```javascript
  import 'bootstrap/dist/js/bootstrap.bundle.min.js'
  ```

## Additional Commands

### Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run build
npm run preview
```

## Development Tips

1. **Hot Module Replacement (HMR)**: Changes to your React components will automatically refresh in the browser
2. **Console Errors**: Check the browser console (F12) for any errors
3. **Network Tab**: Use browser DevTools Network tab to verify assets are loading correctly

## Project Structure Overview

- **`src/`**: All React source code
  - `components/`: Reusable components (Layout)
  - `pages/`: Page components
  - `styles/`: CSS files
- **`public/`**: Static assets (images, fonts, PDFs)
- **`index.html`**: Main HTML template
- **`vite.config.js`**: Vite configuration

## Next Steps After Running

1. Navigate through different pages using the menu
2. Test responsive design by resizing the browser
3. Check all routes are working:
   - `/` - Home
   - `/about/acharya` - About Acharya
   - `/about/divyajanani` - About Divyajanani
   - `/books` - Books
   - `/magazine` - Magazine
   - `/media/photos` - Photos
   - `/calendar` - Calendar
   - `/contact` - Contact

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all dependencies are installed (`npm list`)
3. Ensure Node.js version is 16+ (`node --version`)
4. Try clearing cache: Delete `node_modules` and reinstall

