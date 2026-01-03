# Test Suite for Saibharadwaja.org

This test suite compares the production ASP.NET site with the new React application to ensure functionality and UI match.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Start the local development server:
```bash
npm run dev
```

The dev server should be running on `http://localhost:3000`

## Running Tests

### Run all tests:
```bash
npm test
```

### Run visual comparison tests only:
```bash
npx playwright test tests/visual-comparison.spec.js
```

### Run functional tests only:
```bash
npx playwright test tests/functional-comparison.spec.js
```

### Run tests in UI mode (interactive):
```bash
npx playwright test --ui
```

### Run tests for a specific page:
```bash
npx playwright test -g "Home"
```

## Test Structure

### Visual Comparison Tests (`visual-comparison.spec.js`)
- Takes screenshots of production and local pages
- Compares screenshots pixel-by-pixel
- Tests across multiple viewports (desktop, tablet, mobile)
- Generates diff images for visual inspection
- Saves screenshots for manual review

### Functional Comparison Tests (`functional-comparison.spec.js`)
- Verifies pages load successfully
- Checks page titles match
- Validates images load correctly
- Tests navigation links
- Verifies CSS classes are applied
- Checks for console errors
- Compares navigation menu structure

## Test Results

Test results are saved in:
- `test-results/` - HTML reports, screenshots, and videos
- `test-results/screenshots/` - Individual screenshots
- `test-results/comparisons/` - Diff images showing differences

## Pages Tested

1. **Home** (`/Default.aspx` → `/`)
2. **Acharya** (`/pages/acharyaeb.aspx` → `/about/acharya`)
3. **Divyajanani** (`/pages/Ammagaru/divyajanani.aspx` → `/about/divyajanani`)
4. **Books** (`/pages/sbbooks/sbbooksTel.html` → `/books`)
5. **Magazine** (`/pages/magazine.aspx` → `/magazine`)
6. **Speeches & Videos** (`/pages/sbmedia/sbplayTel.html` → `/media/speeches-videos`)
7. **Photos** (`/photos/gallery1.aspx` → `/media/photos`)
8. **Contact** (`/pages/contacts.aspx` → `/contact`)
9. **Calendar** (`/pages/calander.aspx` → `/calendar`)

## Viewports Tested

- **Desktop**: 1920x1080
- **Tablet**: 768x1024
- **Mobile**: 375x667

## Troubleshooting

### Local server not running
If you see "Local dev server is not running", make sure:
1. Run `npm run dev` in a separate terminal
2. The server is accessible at `http://localhost:3000`
3. Wait a few seconds after starting the server before running tests

### Screenshot differences
Some differences are expected:
- Dynamic content (dates, timestamps)
- Font rendering differences
- Browser-specific styling
- Network timing differences

The test allows up to 15% difference threshold. Adjust in `visual-comparison.spec.js` if needed.

### Timeout errors
If tests timeout:
- Increase timeout in `playwright.config.js`
- Check network connectivity
- Verify production site is accessible

## Continuous Integration

To run tests in CI:
```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Run tests
npm test
```

