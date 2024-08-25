import { test, expect } from '@playwright/test';

// Function to trim leading whitespace
function trimWhitespace(inputString) {
    return inputString.replace(/^\s+|\s+$/g, '');
}

test('generic soccer fan behaviour', async ({ page }) => {
    await page.goto('https://sportklub.n1info.rs/');

    const hoverLink = "#menu-item-9773338 > a";
    await page.hover(hoverLink);
    await page.waitForTimeout(50);

    const premierLiga = "#menu-item-9774392 > a";
    await page.click(premierLiga);
    await page.waitForTimeout(50);

    const expectedUrl = "https://sportklub.n1info.rs/fudbal/premier-league/";
    expect(page.url()).toBe(expectedUrl);

    const newsLinkSelector = "#post-15368775 > div.uc-block-post-grid-text > header > h4 > a";
    let newsLinkText = await page.$eval(newsLinkSelector, (element) => element.textContent);
    console.log('News Link Text:', newsLinkText);

    await page.click(newsLinkSelector);
    await page.waitForTimeout(500);

    const stringTitleSelector = "body > div.wrapper-singlepost > div > div.main-grid > main > div.main-head > h1";


    let stringTitle = await page.$eval(stringTitleSelector, (element) => element.textContent.trim());
    console.log('String Title Text (Before):', stringTitle);

    stringTitle = trimWhitespace(stringTitle);
    console.log('String Title Text (After):', stringTitle);
    newsLinkText = trimWhitespace(newsLinkText);
    expect(newsLinkText).toBe(stringTitle);


    await page.close();
});
