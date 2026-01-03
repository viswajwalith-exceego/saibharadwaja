import { chromium } from 'playwright';

async function debugHomePage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  
  const prodPage = await context.newPage();
  const localPage = await context.newPage();

  try {
    console.log('Loading production page...');
    await prodPage.goto('https://saibharadwaja.org/Default.aspx', { waitUntil: 'networkidle' });
    await prodPage.waitForTimeout(2000);

    console.log('Loading local page...');
    await localPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await localPage.waitForTimeout(2000);

    // Check card header styles
    console.log('\n=== CARD HEADER COMPARISON ===');
    const prodHeader = await prodPage.$('.card-header.textJustifiedNoMarginColored');
    const localHeader = await localPage.$('.card-header.textJustifiedNoMarginColored');

    if (prodHeader && localHeader) {
      const prodStyles = await prodHeader.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          color: style.color,
          padding: style.padding,
          margin: style.margin,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily
        };
      });

      const localStyles = await localHeader.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          color: style.color,
          padding: style.padding,
          margin: style.margin,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily
        };
      });

      console.log('Production header styles:', prodStyles);
      console.log('Local header styles:', localStyles);

      if (prodStyles.backgroundColor !== localStyles.backgroundColor) {
        console.error('❌ BACKGROUND COLOR MISMATCH!');
        console.error(`  Production: ${prodStyles.backgroundColor}`);
        console.error(`  Local: ${localStyles.backgroundColor}`);
      } else {
        console.log('✅ Background colors match');
      }

      if (prodStyles.color !== localStyles.color) {
        console.error('❌ TEXT COLOR MISMATCH!');
        console.error(`  Production: ${prodStyles.color}`);
        console.error(`  Local: ${localStyles.color}`);
      } else {
        console.log('✅ Text colors match');
      }
    }

    // Check main image
    console.log('\n=== MAIN IMAGE COMPARISON ===');
    const prodImg = await prodPage.$('.card-body img.card-img-top');
    const localImg = await localPage.$('.card-body img.card-img-top');

    if (prodImg && localImg) {
      const prodImgSrc = await prodImg.getAttribute('src');
      const localImgSrc = await localImg.getAttribute('src');
      
      console.log('Production image src:', prodImgSrc);
      console.log('Local image src:', localImgSrc);

      const prodImgLoaded = await prodImg.evaluate(img => img.complete && img.naturalHeight > 0);
      const localImgLoaded = await localImg.evaluate(img => img.complete && img.naturalHeight > 0);

      console.log('Production image loaded:', prodImgLoaded);
      console.log('Local image loaded:', localImgLoaded);

      if (prodImgSrc !== localImgSrc) {
        console.error('❌ IMAGE SOURCE MISMATCH!');
      } else {
        console.log('✅ Image sources match');
      }
    }

    // Check card body styles
    console.log('\n=== CARD BODY COMPARISON ===');
    const prodCard = await prodPage.$('.card');
    const localCard = await localPage.$('.card');

    if (prodCard && localCard) {
      const prodCardStyles = await prodCard.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          width: style.width,
          maxWidth: style.maxWidth,
          margin: style.margin,
          backgroundColor: style.backgroundColor
        };
      });

      const localCardStyles = await localCard.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          width: style.width,
          maxWidth: style.maxWidth,
          margin: style.margin,
          backgroundColor: style.backgroundColor
        };
      });

      console.log('Production card styles:', prodCardStyles);
      console.log('Local card styles:', localCardStyles);
    }

    // Take screenshots
    console.log('\n=== TAKING SCREENSHOTS ===');
    await prodPage.screenshot({ path: 'test-results/debug-prod-home.png', fullPage: true });
    await localPage.screenshot({ path: 'test-results/debug-local-home.png', fullPage: true });
    console.log('Screenshots saved to test-results/');

    // Wait for manual inspection
    console.log('\nPress any key to close...');
    await new Promise(resolve => setTimeout(resolve, 30000));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugHomePage();

