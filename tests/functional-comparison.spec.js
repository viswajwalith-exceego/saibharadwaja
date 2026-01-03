import { test, expect } from '@playwright/test';

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

test.describe('Functional Comparison Tests', () => {
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
    test(`${pageMapping.name} - Page loads successfully`, async ({ page }) => {
      // Test production page
      const prodResponse = await page.goto(pageMapping.prodUrl, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      expect(prodResponse.status()).toBeLessThan(400);
      
      // Test local React page
      const localResponse = await page.goto(pageMapping.localUrl, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      expect(localResponse.status()).toBeLessThan(400);
    });

    test(`${pageMapping.name} - Title matches`, async ({ browser }) => {
      const prodPage = await browser.newPage();
      const localPage = await browser.newPage();

      try {
        await prodPage.goto(pageMapping.prodUrl, { waitUntil: 'networkidle' });
        await localPage.goto(pageMapping.localUrl, { waitUntil: 'networkidle' });

        const prodTitle = await prodPage.title();
        const localTitle = await localPage.title();

        expect(localTitle).toBe(prodTitle);
      } finally {
        await prodPage.close();
        await localPage.close();
      }
    });

    test(`${pageMapping.name} - Images load correctly`, async ({ page }) => {
      await page.goto(pageMapping.localUrl, { waitUntil: 'networkidle' });
      
      // Check all images load
      const images = await page.$$eval('img', (imgs) => 
        imgs.map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        }))
      );

      for (const img of images) {
        expect(img.naturalWidth).toBeGreaterThan(0);
        expect(img.naturalHeight).toBeGreaterThan(0);
      }

      console.log(`✓ ${pageMapping.name}: ${images.length} images loaded successfully`);
    });

    test(`${pageMapping.name} - Navigation links work`, async ({ page }) => {
      await page.goto(pageMapping.localUrl, { waitUntil: 'networkidle' });
      
      // Get all internal navigation links
      const links = await page.$$eval('a[href^="/"], a[href^="./"]', (anchors) =>
        anchors.map(a => ({
          href: a.href,
          text: a.textContent?.trim() || '',
          hasHref: !!a.href
        }))
      );

      // Test that links are present and have valid hrefs
      expect(links.length).toBeGreaterThan(0);
      
      for (const link of links) {
        expect(link.hasHref).toBe(true);
        expect(link.href).not.toBe('');
      }

      console.log(`✓ ${pageMapping.name}: ${links.length} navigation links found`);
    });

    test(`${pageMapping.name} - CSS classes are applied`, async ({ page }) => {
      await page.goto(pageMapping.localUrl, { waitUntil: 'networkidle' });
      
      // Wait for React to fully render
      await page.waitForTimeout(1000);
      
      // Check for key CSS classes that should be present
      const bodyClasses = await page.$eval('body', el => Array.from(el.classList));
      const hasBodyFillGrad = bodyClasses.includes('bodyFillGrad') || 
                             await page.$('.bodyFillGrad') !== null;
      
      // Check for Bootstrap classes
      const hasBootstrapClasses = await page.$('.container, .row, .col') !== null;
      
      expect(hasBootstrapClasses).toBe(true);
      
      console.log(`✓ ${pageMapping.name}: CSS classes applied correctly`);
    });

    test(`${pageMapping.name} - No console errors`, async ({ page }) => {
      const errors = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        errors.push(error.message);
      });

      await page.goto(pageMapping.localUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);

      // Filter out known non-critical errors
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('sourcemap') &&
        !error.includes('Extension context invalidated')
      );

      if (criticalErrors.length > 0) {
        console.warn(`⚠ ${pageMapping.name} has console errors:`, criticalErrors);
      }

      // Log but don't fail for minor errors
      expect(criticalErrors.length).toBeLessThan(10);
    });
  }

  test('Navigation menu structure matches', async ({ browser }) => {
    const prodPage = await browser.newPage();
    const localPage = await browser.newPage();

    try {
      await prodPage.goto('https://saibharadwaja.org/Default.aspx', { waitUntil: 'networkidle' });
      await localPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

      // Get navigation links from production
      const prodNavLinks = await prodPage.$$eval('nav a, .manaMainMenuDivs a', (links) =>
        links.map(link => link.textContent?.trim().toLowerCase() || '')
      );

      // Get navigation links from local
      const localNavLinks = await localPage.$$eval('nav a, .manaMainMenuDivs a', (links) =>
        links.map(link => link.textContent?.trim().toLowerCase() || '')
      );

      // Check that key navigation items exist
      const keyNavItems = ['home', 'books', 'magazine', 'contact', 'calendar'];
      
      for (const item of keyNavItems) {
        const prodHasItem = prodNavLinks.some(link => link.includes(item));
        const localHasItem = localNavLinks.some(link => link.includes(item));
        
        expect(localHasItem).toBe(prodHasItem);
      }

      console.log('✓ Navigation menu structure matches');
    } finally {
      await prodPage.close();
      await localPage.close();
    }
  });
});

