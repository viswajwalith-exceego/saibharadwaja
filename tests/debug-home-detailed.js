import { chromium } from 'playwright';

async function debugHomeDetailed() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  
  const prodPage = await context.newPage();
  const localPage = await context.newPage();

  try {
    console.log('Loading production page...');
    await prodPage.goto('https://saibharadwaja.org/Default.aspx', { waitUntil: 'networkidle' });
    await prodPage.waitForTimeout(3000);

    console.log('Loading local page...');
    await localPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await localPage.waitForTimeout(3000);

    // Get page height
    const prodHeight = await prodPage.evaluate(() => document.documentElement.scrollHeight);
    const localHeight = await localPage.evaluate(() => document.documentElement.scrollHeight);
    
    console.log(`\n=== PAGE HEIGHT ===`);
    console.log(`Production: ${prodHeight}px`);
    console.log(`Local: ${localHeight}px`);
    console.log(`Difference: ${Math.abs(prodHeight - localHeight)}px (${((Math.abs(prodHeight - localHeight) / Math.max(prodHeight, localHeight)) * 100).toFixed(1)}%)`);

    // Check card header
    console.log(`\n=== CARD HEADER ===`);
    const prodHeader = await prodPage.$('.card-header.textJustifiedNoMarginColored');
    const localHeader = await localPage.$('.card-header.textJustifiedNoMarginColored');
    
    if (prodHeader && localHeader) {
      const prodHeaderRect = await prodHeader.boundingBox();
      const localHeaderRect = await localHeader.boundingBox();
      const prodHeaderStyles = await prodHeader.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          color: style.color,
          height: style.height,
          padding: style.padding
        };
      });
      const localHeaderStyles = await localHeader.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          color: style.color,
          height: style.height,
          padding: style.padding
        };
      });
      
      console.log('Production header:', prodHeaderStyles, 'Rect:', prodHeaderRect);
      console.log('Local header:', localHeaderStyles, 'Rect:', localHeaderRect);
    }

    // Check main card
    console.log(`\n=== MAIN CARD ===`);
    const prodCard = await prodPage.$('.card');
    const localCard = await localPage.$('.card');
    
    if (prodCard && localCard) {
      const prodCardRect = await prodCard.boundingBox();
      const localCardRect = await localCard.boundingBox();
      console.log('Production card rect:', prodCardRect);
      console.log('Local card rect:', localCardRect);
    }

    // Check footer
    console.log(`\n=== FOOTER ===`);
    const prodFooter = await prodPage.$('footer');
    const localFooter = await localPage.$('footer');
    
    if (prodFooter) {
      const prodFooterRect = await prodFooter.boundingBox();
      const prodFooterText = await prodFooter.textContent();
      console.log('Production footer exists, rect:', prodFooterRect, 'text:', prodFooterText?.substring(0, 50));
    } else {
      console.log('Production: No footer found');
    }
    
    if (localFooter) {
      const localFooterRect = await localFooter.boundingBox();
      const localFooterText = await localFooter.textContent();
      console.log('Local footer exists, rect:', localFooterRect, 'text:', localFooterText?.substring(0, 50));
    } else {
      console.log('Local: No footer found');
    }

    // Count all elements
    console.log(`\n=== ELEMENT COUNTS ===`);
    const prodElements = await prodPage.evaluate(() => ({
      totalDivs: document.querySelectorAll('div').length,
      totalImages: document.querySelectorAll('img').length,
      totalLinks: document.querySelectorAll('a').length,
      cardElements: document.querySelectorAll('.card, .card-header, .card-body, .card-footer').length
    }));
    
    const localElements = await localPage.evaluate(() => ({
      totalDivs: document.querySelectorAll('div').length,
      totalImages: document.querySelectorAll('img').length,
      totalLinks: document.querySelectorAll('a').length,
      cardElements: document.querySelectorAll('.card, .card-header, .card-body, .card-footer').length
    }));
    
    console.log('Production elements:', prodElements);
    console.log('Local elements:', localElements);

    // Check for specific content sections
    console.log(`\n=== CONTENT SECTIONS ===`);
    const prodSections = await prodPage.evaluate(() => {
      const divBody = document.querySelector('#divBody');
      const divtopSMs = document.querySelector('#divtopSMs');
      const divtopLGs = document.querySelector('#divtopLGs');
      return {
        hasDivBody: !!divBody,
        hasDivtopSMs: !!divtopSMs,
        hasDivtopLGs: !!divtopLGs,
        divtopSMsVisible: divtopSMs ? window.getComputedStyle(divtopSMs).display !== 'none' : false,
        divtopLGsVisible: divtopLGs ? window.getComputedStyle(divtopLGs).display !== 'none' : false
      };
    });
    
    const localSections = await localPage.evaluate(() => {
      const divBody = document.querySelector('#divBody');
      const divtopSMs = document.querySelector('#divtopSMs');
      const divtopLGs = document.querySelector('#divtopLGs');
      return {
        hasDivBody: !!divBody,
        hasDivtopSMs: !!divtopSMs,
        hasDivtopLGs: !!divtopLGs,
        divtopSMsVisible: divtopSMs ? window.getComputedStyle(divtopSMs).display !== 'none' : false,
        divtopLGsVisible: divtopLGs ? window.getComputedStyle(divtopLGs).display !== 'none' : false
      };
    });
    
    console.log('Production sections:', prodSections);
    console.log('Local sections:', localSections);

    // Take screenshots
    await prodPage.screenshot({ path: 'test-results/debug-prod-detailed.png', fullPage: true });
    await localPage.screenshot({ path: 'test-results/debug-local-detailed.png', fullPage: true });
    console.log('\nScreenshots saved to test-results/');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugHomeDetailed();

