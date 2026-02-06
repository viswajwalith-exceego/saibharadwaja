# Saibharadwaja.org – Complete Instructions

**Single reference for setup, development, deployment, feature flags, testing, and rollback.**

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [Tech stack & repository structure](#2-tech-stack--repository-structure)
3. [Setup and run (local development)](#3-setup-and-run-local-development)
4. [Menu and navigation](#4-menu-and-navigation)
5. [Page-by-page reference](#5-page-by-page-reference)
6. [Key configuration files](#6-key-configuration-files)
7. [Feature flags](#7-feature-flags)
8. [Build and deploy](#8-build-and-deploy)
9. [Testing](#9-testing)
10. [Testing URLs](#10-testing-urls)
11. [Troubleshooting deployment](#11-troubleshooting-deployment)
12. [Rollback](#12-rollback)
13. [Handover checklist](#13-handover-checklist)

---

## 1. Project overview

- **Site:** [Saibharadwaja.org](https://www.saibharadwaja.org/)
- **Setup:** Hybrid.
  - **Legacy:** ASP.NET Web Forms (`.aspx`) and static HTML. Served from site root.
  - **React app:** SPA under **`/New/`**. New pages are rolled out here and switched via feature flags.
- **Current rollout:** Only **Speeches & Videos** uses the React app by default; all other menu items point to legacy pages. Controlled by **feature flags** (see section 7).

---

## 2. Tech stack & repository structure

### Tech stack

| Layer | Technology |
|-------|------------|
| React app | React 18, React Router 6, Vite 5 |
| Styling | Bootstrap 5, custom CSS in `styles/` and `src/styles/` |
| Legacy | ASP.NET Web Forms, static HTML, jQuery, Bootstrap |
| Build | `npm run build` → `dist/` (deploy contents to `/New/`) |
| Tests | Playwright (optional) |

### Repository structure (high level)

```
Saibharadwaja_org/
├── src/                    # React app source
│   ├── components/         # Layout, AudioPlayer, VideoPlayer
│   ├── config/             # featureFlags.js (menu routes + flag helpers)
│   ├── data/               # books.js, teluguSpeeches.js, videos.js, etc.
│   ├── pages/              # React page components
│   ├── styles/
│   ├── App.jsx             # Routes
│   └── main.jsx            # Entry; basename "/New"
├── public/                 # Copied to dist as-is
│   ├── feature-flags.js    # Single source for React vs legacy menu
│   ├── .htaccess
│   └── web.config
├── pages/                  # Legacy .aspx and HTML (not in dist)
├── images/, fonts/, styles/, scripts/, magazines/, photos/  # Root assets (not in dist)
├── sbHeaderMenu923.html    # Legacy site menu (included via includeHTML)
├── scripts/
│   ├── apply-feature-flags.js   # Runs on legacy pages to apply flags to menu
│   └── include-html.min.js
├── index.html              # React app entry (Vite)
├── vite.config.js          # base: '/New/', plugins for root assets
└── package.json
```

**Important:** Root folders (`images/`, `pages/`, `fonts/`, `styles/`, `scripts/`, `magazines/`, `photos/`) are **not** built into `dist/`. They must already exist on the server at site root. Only the **React app** (and `feature-flags.js`) is deployed into `/New/`.

---

## 3. Setup and run (local development)

### Prerequisites

- **Node.js** (version 16 or higher) – [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

Check versions:

```bash
node --version
npm --version
```

### Install and run

```bash
npm install
npm run dev
```

- App runs at **`http://localhost:3000/New/`** (Vite serves with base `/New/`).
- Root assets (images, fonts, etc.) are served by Vite middleware from project root.

### Troubleshooting (local)

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- --port 3001` |
| Module not found | Delete `node_modules` and `package-lock.json`, then `npm install` |
| Images/fonts not loading | Check asset paths; ensure assets are at root or in `public/` |

---

## 4. Menu and navigation

### Two menus

| Context | Source | Where it appears |
|--------|--------|-------------------|
| **Legacy menu** | `sbHeaderMenu923.html` | Legacy pages that include it (e.g. Books, Speeches legacy). Loaded via `include-html.min.js`. |
| **React menu** | `src/components/Layout.jsx` | Every page under `/New/` (React app). |

Both menus are driven by **feature flags** (section 7).

### Menu items and URLs (single reference)

| Menu label | React path (under /New/) | Legacy URL | Flag key |
|------------|--------------------------|------------|----------|
| Home (logo + text) | `/` | `/Default.aspx` | home |
| Acharya Sri Ekkirala Bharadwaja | `/about/acharya` | `/pages/acharyaeb.aspx` | acharya |
| Divyajanani Alivelu Mangamma | `/about/divyajanani` | `/pages/Ammagaru/divyajanani.aspx` | divyajanani |
| Books | `/books` | `/pages/sbbooks/sbbooksTel.html` | books |
| Saibaba Magazine | `/magazine` | `/pages/magazine.aspx` | magazine |
| Speeches & Videos | `/media/speeches-videos` | `/pages/sbmedia/sbplayTel.html` | speechesVideos |
| Photos | `/media/photos` | `/photos/gallery1.aspx` | photos |
| Contacts | `/contact` | `/pages/contacts.aspx` | contact |
| Calender | `/calendar` | `/pages/calander.aspx` | calendar |

---

## 5. Page-by-page reference

### React app pages (under `/New/`)

| Purpose | React route | Source file | Notes |
|---------|-------------|-------------|--------|
| Home | `/` | `src/pages/Home.jsx` | Carousel, intro, links. |
| Acharya | `/about/acharya` | `src/pages/About/Acharya.jsx` | Biography. |
| Divyajanani | `/about/divyajanani` | `src/pages/About/Divyajanani.jsx` | About page. |
| Books landing | `/books` | `src/pages/Books/Books.jsx` | List; links to Read and Purchase. |
| Books – Purchase | `/books/purchase` | `src/pages/Books/Purchase.jsx` | Data: `src/data/booksPurchase.js`. |
| Books – Read (list) | `/books/read` | `src/pages/Books/Read.jsx` | List of books to read. |
| Books – Read (one book) | `/books/read/:bookId` | `src/pages/Books/BookDetail.jsx` | Page viewer. Optional `?page=5`. Data: `src/data/books.js`. |
| Saibaba Magazine | `/magazine` | `src/pages/Magazine/Magazine.jsx` | PDFs from `magazines/`. |
| Speeches & Videos | `/media/speeches-videos` | `src/pages/Media/SpeechesVideos.jsx` | Tabs: Telugu, English, Bhajans, Videos. |
| Photos | `/media/photos` | `src/pages/Media/Photos.jsx` | Galleries from `/images/Photos/`. |
| Contact | `/contact` | `src/pages/Contact.jsx` | Contact information. |
| Calendar | `/calendar` | `src/pages/Calendar.jsx` | Events calendar. |

### Legacy pages (main menu)

| Purpose | Legacy URL |
|---------|------------|
| Home | `/Default.aspx` |
| Acharya | `/pages/acharyaeb.aspx` |
| Divyajanani | `/pages/Ammagaru/divyajanani.aspx` |
| Books | `/pages/sbbooks/sbbooksTel.html` |
| Saibaba Magazine | `/pages/magazine.aspx` |
| Speeches & Videos | `/pages/sbmedia/sbplayTel.html` |
| Photos | `/photos/gallery1.aspx` |
| Contacts | `/pages/contacts.aspx` |
| Calender | `/pages/calander.aspx` |

### Other legacy URLs (not in main menu)

| Purpose | URL |
|---------|-----|
| Books – Purchase | `/pages/sbbooks/sbBooksPur.html` |
| Speeches – English | `/pages/sbmedia/sbplayEng.html` |
| Speeches – Bhajans | `/pages/sbmedia/sbplaySongs.html` |
| Speeches – Videos (legacy) | `/pages/sbmedia/sbplayVideos.html` |
| Shirdi Arathi Download | `/pages/Shridi_Arathi_Download.aspx` |

---

## 6. Key configuration files

| File | Purpose |
|------|--------|
| `vite.config.js` | Vite config; `base: '/New/'`; plugins for root assets. |
| `src/main.jsx` | React entry; `BrowserRouter` with `basename={"/New"}`. |
| `index.html` | React app HTML; loads `feature-flags.js` then the app. |
| `public/feature-flags.js` | Defines `window.REACT_BASE` and `window.FEATURE_FLAGS`. Deployed as `/New/feature-flags.js`. |
| `src/config/featureFlags.js` | `MENU_ROUTES`, `getFlags()`, `useReact()`. Used by `Layout.jsx`. |
| `sbHeaderMenu923.html` | Legacy menu markup; each link has `href`, `data-flag`, `data-react-path`, optionally `data-legacy-href`. |
| `scripts/apply-feature-flags.js` | On legacy pages, loads feature-flags.js and sets menu link `href` from flags. Include on any page that uses the legacy menu. |

---

## 7. Feature flags

Feature flags switch each section between the **React app** (`/New/...`) and the **legacy** URL without code changes.

### Where the flags live

**Single source of truth:** `public/feature-flags.js` (deployed as `/New/feature-flags.js`)

It defines:

- `window.REACT_BASE` – base path (default `'/New'`)
- `window.FEATURE_FLAGS` – one boolean per section

Example:

```js
window.FEATURE_FLAGS = {
  home: false,
  acharya: false,
  divyajanani: false,
  books: false,
  magazine: false,
  speechesVideos: true,   // only this one uses React by default
  photos: false,
  contact: false,
  calendar: false
};
```

- **`true`** → menu link goes to the React app (`/New/...`).
- **`false`** → menu link goes to the legacy URL.

### Who uses the flags

- **Legacy site:** Pages that include `sbHeaderMenu923.html` also include `scripts/apply-feature-flags.js`. That script loads `/New/feature-flags.js` and updates each menu link that has `data-flag` and `data-react-path`.
- **React app:** `index.html` loads `feature-flags.js`; `Layout.jsx` uses `src/config/featureFlags.js` to render either a React `Link` or an `<a href="...">` to the legacy URL.

### Turning a section to React

1. Open `public/feature-flags.js`.
2. Set the flag to `true`, e.g. `books: true`.
3. Deploy `feature-flags.js` to `/New/feature-flags.js` (and deploy React app if you added a new page).

### Turning back to legacy

Set the flag to `false` and redeploy `feature-flags.js`.

### Adding a new page/section

1. Add route and page in the React app.
2. In `src/config/featureFlags.js`, add an entry to `MENU_ROUTES`.
3. In `public/feature-flags.js`, add a new key to `FEATURE_FLAGS`, e.g. `newSection: false`.
4. In `sbHeaderMenu923.html`, add the link with `data-flag`, `data-react-path`, and legacy `href`.

### Flag keys and URLs

| Flag | React path | Legacy URL |
|------|------------|------------|
| home | / | /Default.aspx |
| acharya | /about/acharya | /pages/acharyaeb.aspx |
| divyajanani | /about/divyajanani | /pages/Ammagaru/divyajanani.aspx |
| books | /books | /pages/sbbooks/sbbooksTel.html |
| magazine | /magazine | /pages/magazine.aspx |
| speechesVideos | /media/speeches-videos | /pages/sbmedia/sbplayTel.html |
| photos | /media/photos | /photos/gallery1.aspx |
| contact | /contact | /pages/contacts.aspx |
| calendar | /calendar | /pages/calander.aspx |

---

## 8. Build and deploy

### Build

```bash
npm run build
```

- Output: **`dist/`** (`index.html`, `assets/`, `feature-flags.js`, `.htaccess`, `web.config`).
- Root folders (images, pages, fonts, etc.) are **not** in `dist/`; they stay at site root on the server.

### Deploy (FTP to GoDaddy)

**Important:** React app is deployed to **`/New/`** only. Root assets must already exist at site root.

#### Step 1: Get FTP credentials

1. Log in to GoDaddy → hosting dashboard → cPanel.
2. Find **FTP Accounts**.
3. Note: **FTP Host**, **Username**, **Password**, **Port** (usually 21).

#### Step 2: Connect (e.g. FileZilla)

- Host: `ftp.yourdomain.com` (or IP from GoDaddy)
- Username, Password, Port 21
- Navigate to **`public_html/`**

#### Step 3: Backup and upload

1. **Backup:** Download existing `public_html/` (or at least `public_html/New/`) if needed.
2. **Navigate** to `public_html/`. Create **`New/`** if it doesn’t exist; go into `New/`.
3. **Delete** old contents of `public_html/New/` (if replacing).
4. **Upload** everything from local **`dist/`** into **`public_html/New/`**:
   - `index.html`
   - `assets/` (entire folder)
   - `feature-flags.js`
   - `.htaccess` (enable “Show hidden files” if needed)
   - `web.config` (if present)
5. **Permissions:** Files `644`, folders `755`.

#### Step 4: Verify root assets on server

These must exist at **site root** (not inside `New/`):

- `public_html/images/`
- `public_html/pages/`
- `public_html/fonts/`
- `public_html/styles/`
- `public_html/scripts/`
- etc.

Do **not** upload them into `New/`.

### Quick deploy checklist

Before deploy:

- [ ] `npm run build` run successfully
- [ ] `dist/` contains `index.html`, `assets/`, `feature-flags.js`, `.htaccess`
- [ ] Root asset folders exist on server at `public_html/...`

During deploy:

- [ ] Backed up existing site if needed
- [ ] Uploaded **all** contents of `dist/` to `public_html/New/`
- [ ] `.htaccess` is in `New/`
- [ ] Permissions: 644 (files), 755 (folders)

After deploy:

- [ ] Test `https://yourdomain.com/New/`
- [ ] Test main routes (Home, Books, Speeches & Videos, etc.)
- [ ] Check browser console for 404s; verify images/CSS load

### Deploy only feature flags (no React rebuild)

To switch a section to React or back to legacy:

1. Edit `public/feature-flags.js` locally.
2. Upload only **`feature-flags.js`** to **`public_html/New/feature-flags.js`** (overwrite).
3. Reload the site; menus will follow the new flags.

---

## 9. Testing

### Manual testing

Use the URLs in section 10. After deploy, smoke-test:

- `https://yourdomain.com/New/`
- `https://yourdomain.com/New/media/speeches-videos`
- Legacy menu: only “Speeches & Videos” should go to `/New/media/speeches-videos`; rest to legacy.
- React menu (on `/New/media/speeches-videos`): only “Speeches & Videos” is a React link; rest go to legacy URLs.

### Playwright (optional)

```bash
npx playwright install
npm run dev    # in another terminal
npm test
```

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:visual` | Visual comparison (screenshots) |
| `npm run test:functional` | Functional tests only |
| `npm run test:report` | View HTML report |

---

## 10. Testing URLs

**Base URLs:**  
- Local: `http://localhost:3000`  
- Production: `https://www.saibharadwaja.org`

### Legacy (main menu)

| Page | URL |
|------|-----|
| Home | `{BASE}/Default.aspx` |
| Acharya | `{BASE}/pages/acharyaeb.aspx` |
| Divyajanani | `{BASE}/pages/Ammagaru/divyajanani.aspx` |
| Books | `{BASE}/pages/sbbooks/sbbooksTel.html` |
| Saibaba Magazine | `{BASE}/pages/magazine.aspx` |
| Speeches & Videos | `{BASE}/pages/sbmedia/sbplayTel.html` |
| Photos | `{BASE}/photos/gallery1.aspx` |
| Contacts | `{BASE}/pages/contacts.aspx` |
| Calender | `{BASE}/pages/calander.aspx` |

### React app (/New/)

| Page | URL |
|------|-----|
| Home | `{BASE}/New/` |
| Acharya | `{BASE}/New/about/acharya` |
| Divyajanani | `{BASE}/New/about/divyajanani` |
| Books | `{BASE}/New/books` |
| Books – Purchase | `{BASE}/New/books/purchase` |
| Books – Read (list) | `{BASE}/New/books/read` |
| Book (e.g. id 1) | `{BASE}/New/books/read/1` |
| Book, page 5 | `{BASE}/New/books/read/1?page=5` |
| Magazine | `{BASE}/New/magazine` |
| Speeches & Videos | `{BASE}/New/media/speeches-videos` |
| Photos | `{BASE}/New/media/photos` |
| Contact | `{BASE}/New/contact` |
| Calendar | `{BASE}/New/calendar` |

### Production – copy-paste (React)

```
https://www.saibharadwaja.org/New/
https://www.saibharadwaja.org/New/about/acharya
https://www.saibharadwaja.org/New/about/divyajanani
https://www.saibharadwaja.org/New/books
https://www.saibharadwaja.org/New/books/purchase
https://www.saibharadwaja.org/New/books/read
https://www.saibharadwaja.org/New/books/read/1
https://www.saibharadwaja.org/New/books/read/1?page=5
https://www.saibharadwaja.org/New/magazine
https://www.saibharadwaja.org/New/media/speeches-videos
https://www.saibharadwaja.org/New/media/photos
https://www.saibharadwaja.org/New/contact
https://www.saibharadwaja.org/New/calendar
```

---

## 11. Troubleshooting deployment

### Images not loading (404)

- Confirm `images/` (and other root assets) exist at **root**: `public_html/images/`, **not** inside `New/`.
- In DevTools Network tab, paths should be `/images/...` (root-relative), not `/New/images/...`.
- Check file permissions: 644 (files), 755 (folders).

### React routes return 404 (e.g. refresh on /New/books)

- Ensure **`.htaccess`** is uploaded inside **`public_html/New/`**.
- `.htaccess` should have `RewriteBase /New/` and rewrite rules to `index.html`.
- Confirm mod_rewrite is enabled (GoDaddy usually has it).

### CSS not loading

- Root CSS: ensure `styles/` exists at `public_html/styles/`.
- React app CSS is in `/New/assets/`; check for 404s in Network tab.

### Audio/video not playing

- Verify `pages/sbmedia/` (or relevant media folder) is on server at root.
- Check file permissions and that paths in the app point to root (e.g. `/pages/sbmedia/...`).

### Fonts not loading

- Verify `fonts/` at `public_html/fonts/`.
- Check font paths in CSS.

### Menu shows wrong links (all React or all legacy)

- Ensure **`feature-flags.js`** is deployed at **`/New/feature-flags.js`** and returns the expected content.
- On legacy pages, ensure **`scripts/apply-feature-flags.js`** is included after the menu.
- Hard refresh or clear cache when testing.

---

## 12. Rollback

### Remove React app from /New/

1. Connect via FTP to GoDaddy.
2. Go to `public_html/`.
3. **Delete the entire `New/` folder** (or rename it).
4. Legacy site at `https://yourdomain.com/` continues to work. Menu links that pointed to `/New/...` will 404 until you point them back to legacy in `sbHeaderMenu923.html` or via feature flags (if you keep serving `feature-flags.js` elsewhere).

### Restore a previous React deploy

1. Keep a backup of the last known-good `dist/` or `public_html/New/` before each deploy.
2. To roll back: upload the backup contents to `public_html/New/` (overwrite current).
3. If only feature flags changed, upload the previous `feature-flags.js` to `public_html/New/feature-flags.js`.

---

## 13. Handover checklist

- [ ] Read this **INSTRUCTIONS.md** end to end.
- [ ] Run `npm install` and `npm run dev`; open `http://localhost:3000/New/` and click through menu and Speeches & Videos.
- [ ] Run `npm run build`; confirm `dist/` has `index.html`, `assets/`, `feature-flags.js`, `.htaccess`.
- [ ] Know where feature flags live (`public/feature-flags.js`) and that only `speechesVideos` is `true` by default.
- [ ] Know legacy menu is in `sbHeaderMenu923.html` and that legacy pages using it must include `scripts/apply-feature-flags.js`.
- [ ] Have FTP/hosting access and a backup/rollback process.
- [ ] Use section 10 (Testing URLs) for smoke tests after deployments.

---

**End of instructions.** For more detail on a topic, see the dedicated docs: `DEVELOPER.md`, `FEATURE_FLAGS.md`, `DEPLOY_FTP_GODADDY.md`, `TESTING_URLS.md`, `ROLLBACK_INSTRUCTIONS.md`, `SETUP_INSTRUCTIONS.md`, `TESTING.md`, `QUICK_DEPLOY_NEW.md`.
