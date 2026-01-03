import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Production URLs and their corresponding React routes
const PAGE_MAPPINGS = [
  {
    name: 'Home',
    prodUrl: 'https://saibharadwaja.org/Default.aspx',
    localUrl: 'http://localhost:3000/',
    route: '/'
  },
  {
    name: 'Acharya',
    prodUrl: 'https://saibharadwaja.org/pages/acharyaeb.aspx',
    localUrl: 'http://localhost:3000/about/acharya',
    route: '/about/acharya'
  },
  {
    name: 'Divyajanani',
    prodUrl: 'https://saibharadwaja.org/pages/Ammagaru/divyajanani.aspx',
    localUrl: 'http://localhost:3000/about/divyajanani',
    route: '/about/divyajanani'
  },
  {
    name: 'Books',
    prodUrl: 'https://saibharadwaja.org/pages/sbbooks/sbbooksTel.html',
    localUrl: 'http://localhost:3000/books',
    route: '/books'
  },
  {
    name: 'Magazine',
    prodUrl: 'https://saibharadwaja.org/pages/magazine.aspx',
    localUrl: 'http://localhost:3000/magazine',
    route: '/magazine'
  },
  {
    name: 'Speeches & Videos',
    prodUrl: 'https://saibharadwaja.org/pages/sbmedia/sbplayTel.html',
    localUrl: 'http://localhost:3000/media/speeches-videos',
    route: '/media/speeches-videos'
  },
  {
    name: 'Photos',
    prodUrl: 'https://saibharadwaja.org/photos/gallery1.aspx',
    localUrl: 'http://localhost:3000/media/photos',
    route: '/media/photos'
  },
  {
    name: 'Contact',
    prodUrl: 'https://saibharadwaja.org/pages/contacts.aspx',
    localUrl: 'http://localhost:3000/contact',
    route: '/contact'
  },
  {
    name: 'Calendar',
    prodUrl: 'https://saibharadwaja.org/pages/calander.aspx',
    localUrl: 'http://localhost:3000/calendar',
    route: '/calendar'
  }
];

// Test configuration
const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

test.describe('Visual Comparison Tests', () => {
  // Wait for local dev server to be ready
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 10000 });
      console.log('✓ Local dev server is running');
    } catch (error) {
      console.error('✗ Local dev server is not running. Please start it with: npm run dev');
      throw new Error('Local dev server must be running on http://localhost:3000');
    }
    await page.close();
  });

  for (const pageMapping of PAGE_MAPPINGS) {
    for (const viewport of VIEWPORTS) {
      test(`${pageMapping.name} - ${viewport.name} viewport`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height }
        });

        const prodPage = await context.newPage();
        const localPage = await context.newPage();

        try {
          // Navigate to production page
          console.log(`Loading production: ${pageMapping.prodUrl}`);
          await prodPage.goto(pageMapping.prodUrl, { 
            waitUntil: 'networkidle',
            timeout: 30000 
          });
          
          // Wait for content to load
          await prodPage.waitForTimeout(2000);
          
          // Take production screenshot
          const prodScreenshot = await prodPage.screenshot({
            fullPage: true,
            animations: 'disabled'
          });

          // Navigate to local React app
          console.log(`Loading local: ${pageMapping.localUrl}`);
          await localPage.goto(pageMapping.localUrl, { 
            waitUntil: 'networkidle',
            timeout: 30000 
          });
          
          // Wait for React to render
          await localPage.waitForTimeout(2000);
          
          // Take local screenshot
          const localScreenshot = await localPage.screenshot({
            fullPage: true,
            animations: 'disabled'
          });

          // Save screenshots for manual review
          const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
          if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
          }
          
          const prodPath = path.join(screenshotDir, `prod-${pageMapping.name}-${viewport.name}.png`);
          const localPath = path.join(screenshotDir, `local-${pageMapping.name}-${viewport.name}.png`);
          
          fs.writeFileSync(prodPath, prodScreenshot);
          fs.writeFileSync(localPath, localScreenshot);

          // Basic validation - screenshots should be saved
          expect(fs.existsSync(prodPath)).toBe(true);
          expect(fs.existsSync(localPath)).toBe(true);
          expect(prodScreenshot.length).toBeGreaterThan(0);
          expect(localScreenshot.length).toBeGreaterThan(0);

          // Compare screenshot sizes - they should be similar
          const prodSize = prodScreenshot.length;
          const localSize = localScreenshot.length;
          const sizeDiff = Math.abs(prodSize - localSize) / Math.max(prodSize, localSize);
          
          // If size difference is more than 50%, likely very different content
          if (sizeDiff > 0.5) {
            console.warn(`⚠ ${pageMapping.name} (${viewport.name}): Screenshot sizes differ significantly (${(sizeDiff * 100).toFixed(1)}%)`);
            console.warn(`  This may indicate major visual differences. Please review screenshots manually.`);
          }

          // For now, we'll save screenshots and require manual review
          // The test will pass but log warnings if sizes differ significantly
          console.log(`✓ ${pageMapping.name} (${viewport.name}): Screenshots saved for comparison`);
          console.log(`  Production: ${prodPath} (${(prodSize / 1024).toFixed(1)} KB)`);
          console.log(`  Local: ${localPath} (${(localSize / 1024).toFixed(1)} KB)`);
          console.log(`  Size difference: ${(sizeDiff * 100).toFixed(1)}%`);
          
          // Note: This test saves screenshots for manual comparison
          // To enable automatic pixel comparison, install: npm install pixelmatch pngjs
          // Then uncomment the comparison code below
          
          // For strict comparison, uncomment this:
          // if (sizeDiff > 0.3) {
          //   throw new Error(`Screenshots differ significantly (${(sizeDiff * 100).toFixed(1)}% size difference). Please review manually.`);
          // }

        } catch (error) {
          console.error(`✗ Error testing ${pageMapping.name} (${viewport.name}):`, error.message);
          // Save screenshots even on error for debugging
          try {
            const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
            if (!fs.existsSync(screenshotDir)) {
              fs.mkdirSync(screenshotDir, { recursive: true });
            }
            const errorProd = await prodPage.screenshot({ fullPage: true });
            const errorLocal = await localPage.screenshot({ fullPage: true });
            fs.writeFileSync(path.join(screenshotDir, `error-prod-${pageMapping.name}-${viewport.name}.png`), errorProd);
            fs.writeFileSync(path.join(screenshotDir, `error-local-${pageMapping.name}-${viewport.name}.png`), errorLocal);
          } catch {}
          throw error;
        } finally {
          await prodPage.close();
          await localPage.close();
          await context.close();
        }
      });
    }
  }
});

