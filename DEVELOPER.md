# Saibharadwaja.org – Developer Documentation

Handover document for support and deployments. Covers the hybrid setup (legacy ASP.NET/HTML + React app under `/New/`), menu behaviour, each page’s purpose, and how to build, test, and deploy.

---

## 1. Project overview

- **Site:** [Saibharadwaja.org](https://www.saibharadwaja.org/)
- **Setup:** Hybrid.
  - **Legacy:** ASP.NET Web Forms (`.aspx`) and static HTML. Served from site root.
  - **React app:** SPA under **`/New/`**. New pages are rolled out here and switched via feature flags.
- **Current rollout:** Only **Speeches & Videos** uses the React app by default; all other menu items point to legacy pages. This is controlled by **feature flags** (see below).

---

## 2. Tech stack

| Layer | Technology |
|-------|------------|
| React app | React 18, React Router 6, Vite 5 |
| Styling | Bootstrap 5, custom CSS in `styles/` and `src/styles/` |
| Legacy | ASP.NET Web Forms, static HTML, jQuery, Bootstrap |
| Build | `npm run build` → `dist/` (deploy contents to `/New/`) |
| Tests | Playwright (optional; see `tests/` and `TESTING.md`) |

---

## 3. Repository structure (high level)

```
Saibharadwaja_org/
├── src/                    # React app source
│   ├── components/        # Layout, AudioPlayer, VideoPlayer
│   ├── config/            # featureFlags.js (menu routes + flag helpers)
│   ├── data/              # books.js, teluguSpeeches.js, videos.js, etc.
│   ├── pages/             # React page components
│   ├── styles/
│   ├── App.jsx            # Routes
│   └── main.jsx           # Entry; basename "/New"
├── public/                # Copied to dist as-is
│   ├── feature-flags.js   # Single source for React vs legacy menu
│   ├── .htaccess
│   └── web.config
├── pages/                 # Legacy .aspx and HTML (not in dist)
├── images/, fonts/, styles/, scripts/, magazines/, photos/  # Root assets (not in dist)
├── sbHeaderMenu923.html   # Legacy site menu (included via includeHTML)
├── scripts/
│   ├── apply-feature-flags.js   # Runs on legacy pages to apply flags to menu
│   └── include-html.min.js
├── index.html             # React app entry (Vite)
├── vite.config.js         # base: '/New/', plugins for root assets
├── package.json
├── DEPLOY_FTP_GODADDY.md  # Full deployment steps
├── FEATURE_FLAGS.md       # How to toggle React vs legacy per section
├── TESTING_URLS.md        # All URLs for testing
└── DEVELOPER.md           # This file
```

**Important:** Root folders (`images/`, `pages/`, `fonts/`, `styles/`, `scripts/`, `magazines/`, `photos/`) are **not** built into `dist/`. They must already exist on the server at site root. Only the **React app** (and `feature-flags.js`) is deployed into `/New/`.

---

## 4. Menu and navigation

### Two menus

| Context | Source | Where it appears |
|--------|--------|-------------------|
| **Legacy menu** | `sbHeaderMenu923.html` | Legacy pages that include it (e.g. Books, Speeches legacy, etc.). Loaded via `include-html.min.js`. |
| **React menu** | `src/components/Layout.jsx` | Every page under `/New/` (React app). |

Both menus are driven by **feature flags** so that, for each section, the link can point either to the React app (`/New/...`) or to the legacy URL.

### Feature flags (summary)

- **Config file:** `public/feature-flags.js` (deployed as `/New/feature-flags.js`).
- **Flags:** One boolean per section: `home`, `acharya`, `divyajanani`, `books`, `magazine`, `speechesVideos`, `photos`, `contact`, `calendar`.
- **`true`** → that section’s menu link goes to the React app.
- **`false`** → that section’s menu link goes to the legacy URL.

**Current default:** Only `speechesVideos: true`; all others `false`. So only “Speeches & Videos” uses the React app; the rest use legacy.

- **Legacy pages:** Include `scripts/apply-feature-flags.js`. It loads `/New/feature-flags.js` and updates menu links that have `data-flag` and `data-react-path`.
- **React app:** `index.html` loads `feature-flags.js`; `Layout.jsx` uses `src/config/featureFlags.js` and the flags to render either a React `Link` or an `<a href="...">` to the legacy URL.

Full details: **FEATURE_FLAGS.md**.

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

### 5.1 React app pages (under `/New/`)

Served by the React SPA. Route definitions are in `src/App.jsx`; layout and menu in `src/components/Layout.jsx`.

| Purpose | React route | Source file | Notes |
|---------|-------------|-------------|--------|
| Home | `/` | `src/pages/Home.jsx` | Carousel, intro, links to Books/Magazine etc. |
| Acharya Sri Ekkirala Bharadwaja | `/about/acharya` | `src/pages/About/Acharya.jsx` | Biography and content. |
| Divyajanani Alivelu Mangamma | `/about/divyajanani` | `src/pages/About/Divyajanani.jsx` | About page. |
| Books landing | `/books` | `src/pages/Books/Books.jsx` | List of books; links to Read and Purchase. |
| Books – Purchase | `/books/purchase` | `src/pages/Books/Purchase.jsx` | Purchase info; data from `src/data/booksPurchase.js`. |
| Books – Read (list) | `/books/read` | `src/pages/Books/Read.jsx` | List of books to read. |
| Books – Read (one book) | `/books/read/:bookId` | `src/pages/Books/BookDetail.jsx` | Page-by-page viewer. Optional `?page=5`. Data: `src/data/books.js`. |
| Saibaba Magazine | `/magazine` | `src/pages/Magazine/Magazine.jsx` | Magazine issues (PDFs from `magazines/`). |
| Speeches & Videos | `/media/speeches-videos` | `src/pages/Media/SpeechesVideos.jsx` | Tabs: Telugu speeches, English speeches, Bhajans, Videos. Uses `AudioPlayer`, `VideoPlayer`; data in `src/data/`. |
| Photos | `/media/photos` | `src/pages/Media/Photos.jsx` | Photo galleries; images from `/images/Photos/`. |
| Contact | `/contact` | `src/pages/Contact.jsx` | Contact information. |
| Calendar | `/calendar` | `src/pages/Calendar.jsx` | Events calendar. |

### 5.2 Legacy pages (main menu)

These are the targets when the corresponding feature flag is `false`. The **menu link** for each is the “Legacy URL” in the table in section 4.

| Purpose | Legacy URL | Source / notes |
|---------|------------|----------------|
| Home | `/Default.aspx` | Root default. |
| Acharya | `/pages/acharyaeb.aspx` | ASP.NET. |
| Divyajanani | `/pages/Ammagaru/divyajanani.aspx` | ASP.NET. |
| Books | `/pages/sbbooks/sbbooksTel.html` | HTML; uses `sbHeaderMenu923.html` + `apply-feature-flags.js`. |
| Saibaba Magazine | `/pages/magazine.aspx` | ASP.NET. |
| Speeches & Videos | `/pages/sbmedia/sbplayTel.html` | HTML; Telugu speeches. Related: `sbplayEng.html`, `sbplaySongs.html`, `sbplayVideos.html`. |
| Photos | `/photos/gallery1.aspx` | ASP.NET (or under `photos/`). |
| Contacts | `/pages/contacts.aspx` | ASP.NET. |
| Calender | `/pages/calander.aspx` | ASP.NET (note spelling “calander”). |

### 5.3 Other legacy URLs (not in main menu)

| Purpose | URL |
|---------|-----|
| Books – Purchase (legacy) | `/pages/sbbooks/sbBooksPur.html` |
| Speeches – English | `/pages/sbmedia/sbplayEng.html` |
| Speeches – Bhajans | `/pages/sbmedia/sbplaySongs.html` |
| Speeches – Videos (legacy) | `/pages/sbmedia/sbplayVideos.html` |
| Shirdi Arathi Download | `/pages/Shridi_Arathi_Download.aspx` |

---

## 6. Key configuration files

| File | Purpose |
|------|--------|
| `vite.config.js` | Vite config; `base: '/New/'`; plugins for serving root assets in dev and handling build. |
| `src/main.jsx` | React entry; `BrowserRouter` with `basename={"/New"}`. |
| `index.html` | React app HTML; loads `feature-flags.js` then the app. |
| `public/feature-flags.js` | Defines `window.REACT_BASE` and `window.FEATURE_FLAGS`. Deployed to `/New/feature-flags.js`. |
| `src/config/featureFlags.js` | `MENU_ROUTES` (React path + legacy URL per flag), `getFlags()`, `useReact()`. Used by `Layout.jsx`. |
| `sbHeaderMenu923.html` | Legacy menu markup. Each link has `href`, `data-flag`, `data-react-path`, and optionally `data-legacy-href`. |
| `scripts/apply-feature-flags.js` | On legacy pages, loads feature-flags.js and sets menu link `href` from flags. Must be included on any page that includes the legacy menu. |

---

## 7. Build, run, test

### Install and run (dev)

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000/New/` (Vite serves with base `/New/`). Root assets (images, fonts, etc.) are served by Vite middleware from project root.

### Build for production

```bash
npm run build
```

- Output: **`dist/`** (e.g. `index.html`, `assets/*`, `feature-flags.js`, `.htaccess`, `web.config`).
- Deploy **entire contents of `dist/`** to the server’s **`/New/`** directory (e.g. `public_html/New/` on GoDaddy).
- Do **not** deploy root folders (images, pages, fonts, etc.) into `New/`; they stay at site root.

### Tests (optional)

- **TESTING_URLS.md** – List of all legacy and React URLs for manual or automated testing.
- **TESTING.md** – Test instructions.
- Playwright: `npm run test`, `npm run test:visual`, etc. (see `package.json` and `tests/`).

---

## 8. Deployment

- **React app:** Upload contents of **`dist/`** to the server’s **`/New/`** folder (e.g. via FTP to `public_html/New/`). Root assets must already exist at site root.
- **Legacy:** Normal deployment of `.aspx`, `.html`, `sbHeaderMenu923.html`, `scripts/apply-feature-flags.js`, etc. to their existing paths.
- **Feature flags:** Deploy updated `public/feature-flags.js` to the same place the app loads it (e.g. overwrite `/New/feature-flags.js`). No React rebuild needed to change which sections use React.

**Detailed steps (FTP, GoDaddy, .htaccess):** **DEPLOY_FTP_GODADDY.md**  
**Quick deploy:** **QUICK_DEPLOY_NEW.md** / **QUICK_FTP_DEPLOY.md**  
**Rollback:** **ROLLBACK_INSTRUCTIONS.md**

---

## 9. Feature flags (reminder)

- **Toggle a section to React:** In `public/feature-flags.js`, set that section’s flag to `true`. Redeploy `feature-flags.js` (and redeploy React app if you added a new page).
- **Toggle back to legacy:** Set the flag to `false` and redeploy `feature-flags.js`.
- **Add a new section:** Add route and page in React; add entry in `src/config/featureFlags.js`; add flag in `public/feature-flags.js`; add link with `data-flag` and `data-react-path` in `sbHeaderMenu923.html`.

See **FEATURE_FLAGS.md** for full details and the flag ↔ URL table.

---

## 10. Testing URLs (quick list)

**Production base:** `https://www.saibharadwaja.org`

**React app:**

- https://www.saibharadwaja.org/New/
- https://www.saibharadwaja.org/New/about/acharya
- https://www.saibharadwaja.org/New/about/divyajanani
- https://www.saibharadwaja.org/New/books
- https://www.saibharadwaja.org/New/books/purchase
- https://www.saibharadwaja.org/New/books/read
- https://www.saibharadwaja.org/New/books/read/1
- https://www.saibharadwaja.org/New/books/read/1?page=5
- https://www.saibharadwaja.org/New/magazine
- https://www.saibharadwaja.org/New/media/speeches-videos
- https://www.saibharadwaja.org/New/media/photos
- https://www.saibharadwaja.org/New/contact
- https://www.saibharadwaja.org/New/calendar

Full list (legacy + React, localhost + production): **TESTING_URLS.md**.

---

## 11. Handover checklist

- [ ] Read **DEVELOPER.md** (this file), **FEATURE_FLAGS.md**, **DEPLOY_FTP_GODADDY.md**.
- [ ] Run `npm install` and `npm run dev`; open `http://localhost:3000/New/` and click through main menu and Speeches & Videos.
- [ ] Run `npm run build`; confirm `dist/` contains `index.html`, `assets/`, `feature-flags.js`, `.htaccess`.
- [ ] Know where feature flags live (`public/feature-flags.js`) and that only `speechesVideos` is `true` by default.
- [ ] Know that the legacy menu is in `sbHeaderMenu923.html` and that legacy pages using it must include `scripts/apply-feature-flags.js`.
- [ ] Have FTP/hosting access and backup/rollback process (see **ROLLBACK_INSTRUCTIONS.md**).
- [ ] Use **TESTING_URLS.md** for smoke tests after deployments.

---

## 12. Document index

| Document | Purpose |
|----------|--------|
| **DEVELOPER.md** | This handover: structure, pages, menu, build, deploy, flags. |
| **README.md** | Short project intro and React setup. |
| **FEATURE_FLAGS.md** | How feature flags work and how to change them. |
| **DEPLOY_FTP_GODADDY.md** | Step-by-step deployment (FTP, GoDaddy). |
| **QUICK_DEPLOY_NEW.md** / **QUICK_FTP_DEPLOY.md** | Short deploy reminders. |
| **ROLLBACK_INSTRUCTIONS.md** | How to roll back a release. |
| **TESTING_URLS.md** | All URLs for testing (legacy + React). |
| **TESTING.md** | Test setup and commands. |
| **SETUP_INSTRUCTIONS.md** | Dev environment setup. |
