# Testing Guide - Production vs React App Comparison

This guide explains how to use the automated test suite to compare the production ASP.NET site with the new React application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Start the development server** (in a separate terminal):
   ```bash
   npm run dev
   ```

4. **Run all tests:**
   ```bash
   npm test
   ```

## Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (visual + functional) |
| `npm run test:ui` | Run tests in interactive UI mode |
| `npm run test:visual` | Run visual comparison tests (saves screenshots) |
| `npm run test:visual:strict` | Run strict visual tests (fails on differences) |
| `npm run test:functional` | Run only functional tests |
| `npm run test:report` | View the HTML test report |

## What Gets Tested

### Visual Comparison Tests
- Takes full-page screenshots of production and local pages
- Compares across 3 viewports: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- Saves screenshots for manual review
- Tests all 9 main pages

### Functional Comparison Tests
- ✅ Page loads successfully (HTTP status codes)
- ✅ Page titles match
- ✅ Images load correctly (no broken images)
- ✅ Navigation links work
- ✅ CSS classes are applied
- ✅ No console errors
- ✅ Navigation menu structure matches

## Pages Tested

| Production URL | React Route | Page Name |
|---------------|-------------|-----------|
| `/Default.aspx` | `/` | Home |
| `/pages/acharyaeb.aspx` | `/about/acharya` | Acharya |
| `/pages/Ammagaru/divyajanani.aspx` | `/about/divyajanani` | Divyajanani |
| `/pages/sbbooks/sbbooksTel.html` | `/books` | Books |
| `/pages/magazine.aspx` | `/magazine` | Magazine |
| `/pages/sbmedia/sbplayTel.html` | `/media/speeches-videos` | Speeches & Videos |
| `/photos/gallery1.aspx` | `/media/photos` | Photos |
| `/pages/contacts.aspx` | `/contact` | Contact |
| `/pages/calander.aspx` | `/calendar` | Calendar |

## Test Results

After running tests, check:

- **`test-results/`** - Main test results directory
  - `screenshots/` - All screenshots (production and local)
  - `comparisons/` - Diff images (if pixel comparison enabled)
  - `playwright-report/` - HTML test report

### Viewing Results

1. **HTML Report:**
   ```bash
   npm run test:report
   ```
   Opens an interactive HTML report in your browser

2. **Screenshots:**
   - Production screenshots: `test-results/screenshots/prod-*.png`
   - Local screenshots: `test-results/screenshots/local-*.png`
   - Compare them side-by-side manually

## Understanding Test Results

### Visual Tests

**Standard Visual Tests (`test:visual`):**
- Screenshots are saved for every page and viewport
- Manually compare `prod-*.png` vs `local-*.png` files
- Tests pass but log warnings if sizes differ significantly
- Use this for initial comparison and manual review

**Strict Visual Tests (`test:visual:strict`):**
- **Fails if visual differences are detected**
- Compares CSS properties (colors, sizes, layout)
- Checks element counts (images, links, etc.)
- Fails if screenshot size difference > 40%
- Use this to catch regressions and ensure accuracy

Look for differences in:
  - Layout and spacing
  - Colors and fonts
  - Image positioning
  - Responsive behavior

### Functional Tests
- ✅ Green checkmark = Test passed
- ❌ Red X = Test failed
- Check the error message for details

## Troubleshooting

### "Local dev server is not running"
**Solution:** Start the dev server in a separate terminal:
```bash
npm run dev
```
Wait a few seconds for it to start, then run tests again.

### Tests timeout
**Solution:** 
- Check your internet connection (production site must be accessible)
- Increase timeout in `playwright.config.js`
- Some pages may take longer to load

### Screenshots look different
**Expected differences:**
- Font rendering (browser-specific)
- Dynamic content (dates, timestamps)
- Network timing differences
- Browser-specific CSS rendering

**Unexpected differences:**
- Layout completely broken
- Missing images
- Wrong colors
- Navigation not working

### Images not loading
**Check:**
1. Images exist in `images/` folder
2. Image paths are correct (check browser console)
3. Vite is serving static assets correctly

## Advanced Usage

### Run tests for specific page
```bash
npx playwright test -g "Home"
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests with debug mode
```bash
npx playwright test --debug
```

### Update screenshots (if you change expected appearance)
```bash
npx playwright test --update-snapshots
```

## CI/CD Integration

For continuous integration, add to your CI config:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Start dev server
  run: npm run dev &
  
- name: Run tests
  run: npm test
  
- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: test-results
    path: test-results/
```

## Best Practices

1. **Run tests before committing** - Ensure changes don't break existing pages
2. **Review screenshots manually** - Automated comparison may miss subtle issues
3. **Fix functional tests first** - Broken functionality is more critical than visual differences
4. **Test on multiple browsers** - Uncomment other browsers in `playwright.config.js`
5. **Keep test results** - Don't commit `test-results/` folder (already in `.gitignore`)

## Next Steps

After tests pass:
1. Review all screenshots manually
2. Test interactive features (carousel, accordion, etc.)
3. Test on real devices if possible
4. Get stakeholder approval
5. Deploy to production!

## Need Help?

- Check `tests/README.md` for detailed test documentation
- Review Playwright docs: https://playwright.dev
- Check browser console for errors
- Review test output for specific error messages

