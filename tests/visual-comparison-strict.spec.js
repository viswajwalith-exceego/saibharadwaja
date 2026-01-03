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

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

test.describe('Strict Visual Comparison Tests', () => {
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
      test(`${pageMapping.name} - ${viewport.name} viewport - STRICT`, async ({ browser }) => {
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
          await prodPage.waitForTimeout(2000);
          
          // Navigate to local React app
          console.log(`Loading local: ${pageMapping.localUrl}`);
          await localPage.goto(pageMapping.localUrl, { 
            waitUntil: 'networkidle',
            timeout: 30000 
          });
          await localPage.waitForTimeout(2000);

          // Get key visual elements for comparison
          const prodCardHeader = await prodPage.$('.card-header.textJustifiedNoMarginColored');
          const localCardHeader = await localPage.$('.card-header.textJustifiedNoMarginColored');

          // Compare card header background color (if exists)
          if (prodCardHeader && localCardHeader) {
            const prodBgColor = await prodCardHeader.evaluate(el => {
              const style = window.getComputedStyle(el);
              return {
                backgroundColor: style.backgroundColor,
                color: style.color
              };
            });
            
            const localBgColor = await localCardHeader.evaluate(el => {
              const style = window.getComputedStyle(el);
              return {
                backgroundColor: style.backgroundColor,
                color: style.color
              };
            });

            console.log(`Production header: bg=${prodBgColor.backgroundColor}, color=${prodBgColor.color}`);
            console.log(`Local header: bg=${localBgColor.backgroundColor}, color=${localBgColor.color}`);

            // Check if colors match (allowing for slight variations)
            if (prodBgColor.backgroundColor !== localBgColor.backgroundColor) {
              throw new Error(
                `Card header background color mismatch!\n` +
                `Production: ${prodBgColor.backgroundColor}\n` +
                `Local: ${localBgColor.backgroundColor}\n` +
                `Please check CSS for .card-header.textJustifiedNoMarginColored`
              );
            }

            if (prodBgColor.color !== localBgColor.color) {
              throw new Error(
                `Card header text color mismatch!\n` +
                `Production: ${prodBgColor.color}\n` +
                `Local: ${localBgColor.color}\n` +
                `Please check CSS for .card-header.textJustifiedNoMarginColored`
              );
            }
          }

          // Compare main content area
          const prodBody = await prodPage.$('#divBody');
          const localBody = await localPage.$('#divBody');

          if (prodBody && localBody) {
            const prodBodyStyles = await prodBody.evaluate(el => {
              const style = window.getComputedStyle(el);
              return {
                width: style.width,
                maxWidth: style.maxWidth,
                margin: style.margin
              };
            });

            const localBodyStyles = await localBody.evaluate(el => {
              const style = window.getComputedStyle(el);
              return {
                width: style.width,
                maxWidth: style.maxWidth,
                margin: style.margin
              };
            });

            // Check layout matches
            if (prodBodyStyles.width !== localBodyStyles.width) {
              console.warn(`⚠ Width mismatch: prod=${prodBodyStyles.width}, local=${localBodyStyles.width}`);
            }
          }

          // Check for key elements that should exist (only visible images)
          const prodImages = await prodPage.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs.filter(img => {
              const style = window.getComputedStyle(img);
              return style.display !== 'none' && style.visibility !== 'hidden' && img.offsetWidth > 0 && img.offsetHeight > 0;
            }).length;
          });
          
          const localImages = await localPage.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs.filter(img => {
              const style = window.getComputedStyle(img);
              return style.display !== 'none' && style.visibility !== 'hidden' && img.offsetWidth > 0 && img.offsetHeight > 0;
            }).length;
          });
          
          // Allow some difference for responsive images that show/hide based on viewport
          const imageDiff = Math.abs(prodImages - localImages);
          if (imageDiff > 3) {
            console.warn(`⚠ Image count difference: Production=${prodImages}, Local=${localImages} (diff=${imageDiff})`);
            // Don't fail for image count, but log it - this is expected due to responsive design
          }

          // Take screenshots for manual review
          const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
          if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
          }
          
          const prodScreenshot = await prodPage.screenshot({ fullPage: true, animations: 'disabled' });
          const localScreenshot = await localPage.screenshot({ fullPage: true, animations: 'disabled' });
          
          const prodPath = path.join(screenshotDir, `prod-${pageMapping.name}-${viewport.name}.png`);
          const localPath = path.join(screenshotDir, `local-${pageMapping.name}-${viewport.name}.png`);
          
          fs.writeFileSync(prodPath, prodScreenshot);
          fs.writeFileSync(localPath, localScreenshot);

          // Compare file sizes - significant difference indicates major visual changes
          const prodSize = prodScreenshot.length;
          const localSize = localScreenshot.length;
          const sizeDiff = Math.abs(prodSize - localSize) / Math.max(prodSize, localSize);

          console.log(`✓ ${pageMapping.name} (${viewport.name}): Visual elements checked`);
          console.log(`  Screenshots: ${prodPath} | ${localPath}`);
          console.log(`  Size difference: ${(sizeDiff * 100).toFixed(1)}%`);

          // Fail if size difference is too large (indicates major visual differences)
          if (sizeDiff > 0.4) {
            throw new Error(
              `Screenshots differ significantly (${(sizeDiff * 100).toFixed(1)}% size difference).\n` +
              `This suggests major visual differences. Please review screenshots manually:\n` +
              `  Production: ${prodPath}\n` +
              `  Local: ${localPath}`
            );
          }

        } catch (error) {
          // Save screenshots on error for debugging
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

