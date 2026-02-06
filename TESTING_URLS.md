# Testing URLs Reference

Use these URLs for manual or automated testing. Replace `{BASE}` with:
- **Local:** `http://localhost:3000`
- **Production:** `https://www.saibharadwaja.org` (or your domain)

---

## Legacy pages (old site – .aspx / .html)

### Main menu
| Page | URL |
|------|-----|
| Home | `{BASE}/Default.aspx` |
| Acharya Sri Ekkirala Bharadwaja | `{BASE}/pages/acharyaeb.aspx` |
| Divyajanani Alivelu Mangamma | `{BASE}/pages/Ammagaru/divyajanani.aspx` |
| Books | `{BASE}/pages/sbbooks/sbbooksTel.html` |
| Saibaba Magazine | `{BASE}/pages/magazine.aspx` |
| Speeches & Videos | `{BASE}/pages/sbmedia/sbplayTel.html` |
| Photos | `{BASE}/photos/gallery1.aspx` |
| Contacts | `{BASE}/pages/contacts.aspx` |
| Calender | `{BASE}/pages/calander.aspx` |

### Other legacy
| Page | URL |
|------|-----|
| Books – Purchase | `{BASE}/pages/sbbooks/sbBooksPur.html` |
| Speeches – English | `{BASE}/pages/sbmedia/sbplayEng.html` |
| Speeches – Bhajans | `{BASE}/pages/sbmedia/sbplaySongs.html` |
| Speeches – Videos (legacy) | `{BASE}/pages/sbmedia/sbplayVideos.html` |
| Magazine (alternate) | `{BASE}/pages/magazine2june2025.aspx` |
| Shirdi Arathi Download | `{BASE}/pages/Shridi_Arathi_Download.aspx` |
| Speeches (ASPX) | `{BASE}/pages/speeches.aspx` |

---

## React app (new site under /New/)

Base path for React: `{BASE}/New`

### Main routes
| Page | URL |
|------|-----|
| Home | `{BASE}/New/` or `{BASE}/New` |
| Acharya | `{BASE}/New/about/acharya` |
| Divyajanani | `{BASE}/New/about/divyajanani` |
| Books | `{BASE}/New/books` |
| Books – Purchase | `{BASE}/New/books/purchase` |
| Books – Read (list) | `{BASE}/New/books/read` |
| Magazine | `{BASE}/New/magazine` |
| Speeches & Videos | `{BASE}/New/media/speeches-videos` |
| Photos | `{BASE}/New/media/photos` |
| Contact | `{BASE}/New/contact` |
| Calendar | `{BASE}/New/calendar` |

### Book read (specific book and optional page)
| Description | URL |
|-------------|-----|
| Book by numeric id (e.g. 1) | `{BASE}/New/books/read/1` |
| Book by numeric id, page 5 | `{BASE}/New/books/read/1?page=5` |
| Book by slug | `{BASE}/New/books/read/Bhagavan-Sri-Bharadwaja` |
| Book by slug, page 10 | `{BASE}/New/books/read/Bhagavan-Sri-Bharadwaja?page=10` |

**Sample book ids from app:** `1`, `2`, `Vignana-Veechikalu`, `Sri-Sai-Leelamruthamu`, `Sri-Sainathaprabodhamruthamu`, `Sri-Sai-Sannidhi`, `Sri-Swamy-Samartha`, `Bhagavan-Sri-Bharadwaja`, `Mahapurushudu`, `Mahatmula-Muddu-Biddadu`.

---

## Quick copy-paste (localhost)

### Legacy
```
http://localhost:3000/Default.aspx
http://localhost:3000/pages/acharyaeb.aspx
http://localhost:3000/pages/Ammagaru/divyajanani.aspx
http://localhost:3000/pages/sbbooks/sbbooksTel.html
http://localhost:3000/pages/magazine.aspx
http://localhost:3000/pages/sbmedia/sbplayTel.html
http://localhost:3000/photos/gallery1.aspx
http://localhost:3000/pages/contacts.aspx
http://localhost:3000/pages/calander.aspx
```

### React (/New/)
```
http://localhost:3000/New/
http://localhost:3000/New/about/acharya
http://localhost:3000/New/about/divyajanani
http://localhost:3000/New/books
http://localhost:3000/New/books/purchase
http://localhost:3000/New/books/read
http://localhost:3000/New/books/read/1
http://localhost:3000/New/books/read/1?page=5
http://localhost:3000/New/magazine
http://localhost:3000/New/media/speeches-videos
http://localhost:3000/New/media/photos
http://localhost:3000/New/contact
http://localhost:3000/New/calendar
```

---

## Feature-flag / menu testing

- **Legacy menu** (from `sbHeaderMenu923.html`): open any legacy URL above; only “Speeches & Videos” should go to `/New/media/speeches-videos`, rest to legacy.
- **React menu** (on `/New/media/speeches-videos`): only “Speeches & Videos” should be a React link; all other items should point to the legacy URLs listed above.
