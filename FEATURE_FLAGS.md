# Feature flags – release React pages one by one

Feature flags let you switch each section between the **new React app** (`/New/...`) and the **legacy** (`.aspx` / `.html`) without changing code. Update one file and redeploy it to change behaviour.

## 1. Where the flags live

**Single source of truth:** `public/feature-flags.js`

It defines:

- `window.REACT_BASE` – base path for the React app (default `'/New'`)
- `window.FEATURE_FLAGS` – one boolean per section

Example:

```js
window.FEATURE_FLAGS = {
  home: false,
  acharya: false,
  divyajanani: false,
  books: false,
  magazine: false,
  speechesVideos: true,   // only this one uses React for now
  photos: false,
  contact: false,
  calendar: false
};
```

- **`true`** → menu links go to the React app (`/New/...`).
- **`false`** → menu links go to the legacy URL (e.g. `/pages/...aspx`, `.html`).

## 2. Turning a section “React” on

1. Open `public/feature-flags.js`.
2. Set the flag for that section to `true`, e.g. `books: true`.
3. Deploy **only** `public/feature-flags.js` (and your React build if you changed the app). No need to rebuild the React app only for the switch.

After deployment, both the legacy menu and the React app menu will send that section to the React page.

## 3. What uses the flags

- **Legacy site**  
  Pages that include `sbHeaderMenu923.html` also include `scripts/apply-feature-flags.js`.  
  That script loads `/New/feature-flags.js` and updates each menu link that has `data-flag` and `data-react-path`: if the flag is `true`, the link becomes `REACT_BASE + data-react-path` (e.g. `/New/books`).

- **React app**  
  `index.html` loads `/New/feature-flags.js` before the app.  
  `Layout.jsx` uses `getFlags()` / `useReact()` from `src/config/featureFlags.js` to decide, per item, whether to render a React `Link` or an `<a href="...">` to the legacy URL.

So one config drives both legacy and React menus.

## 4. Adding a new page/section

1. **React:** Add the route and page in the React app as usual.
2. **Config:** In `src/config/featureFlags.js`, add an entry to `MENU_ROUTES` (flag key, `reactPath`, `legacyUrl`, label, etc.).
3. **Flags:** In `public/feature-flags.js`, add a new key to `FEATURE_FLAGS`, e.g. `newSection: false`.
4. **Legacy menu:** In `sbHeaderMenu923.html`, add the new link with the same `data-flag` and `data-react-path` and the legacy `href`.

After that, toggling the new flag will switch that section between React and legacy.

## 5. Deploying

- **Legacy:** Ensure `scripts/apply-feature-flags.js` is on the server and that every page that uses the header includes it (see list in “What uses the flags”).
- **React:** Build and deploy the React app under `/New/` as usual. The build copies `public/feature-flags.js` into `dist/`, so it is served as `/New/feature-flags.js`.
- To **switch a section** without a new React build: upload an updated `public/feature-flags.js` to the same place (e.g. overwrite `feature-flags.js` in the `/New/` folder). Reload the site and the menus will follow the new flags.

## 6. Flag keys and URLs

| Flag            | React path              | Legacy URL                      |
|----------------|-------------------------|----------------------------------|
| home           | /                       | /Default.aspx                    |
| acharya        | /about/acharya          | /pages/acharyaeb.aspx            |
| divyajanani    | /about/divyajanani      | /pages/Ammagaru/divyajanani.aspx |
| books          | /books                  | /pages/sbbooks/sbbooksTel.html   |
| magazine       | /magazine               | /pages/magazine.aspx             |
| speechesVideos | /media/speeches-videos  | /pages/sbmedia/sbplayTel.html    |
| photos         | /media/photos           | /photos/gallery1.aspx            |
| contact        | /contact                 | /pages/contacts.aspx             |
| calendar       | /calendar                | /pages/calander.aspx              |

These are kept in sync in `src/config/featureFlags.js` and in the legacy menu’s `data-flag` / `data-react-path` and default `href` values.
