import { test, expect } from '@playwright/test';

test('find specific article using search and check contents', async ({ page }) => {
  await page.goto('https://sportklub.n1info.rs/');

  const searchIconSelector = 'body > header > div > div > div.header-nav__desk > div > div.header-nav__top > div > div > div.header-nav__top-right > form';
  await page.click(searchIconSelector);

  const searchBoxSelector = "body > header > div > div > div.header-nav__desk > div > div.header-nav__top > div > div > div.header-nav__top-right > form > input.searchbox-input";
  await page.waitForSelector(searchBoxSelector);

  //da , Danilo iz naslova i teksta jeste zapravo ja iz mladjih dana
  const searchText = 'Kako deca postaju šampioni? Pitajte Nikolu i Danila';
  await page.type(searchBoxSelector, searchText);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(50);
  //await page.screenshot({ path: 'search_results.png' });

  const resultNumberSelector = '.search-results-number';
  await page.waitForSelector(resultNumberSelector);

  const actualText = await page.$eval(resultNumberSelector, (element) => element.textContent);
  const expectedText = '1 pronađenih rezultata';

  expect(actualText).toContain(expectedText);

  console.log('Assertion 1 passed: Expected text found in the element:', actualText);

  const pageSelector = "#post-13191752 > div.uc-block-post-grid-text > header > h4 > a";
  await page.click(pageSelector);
  await page.waitForTimeout(2000);
  // await page.screenshot({ path: 'page.png' });

  const pageHeight = await page.evaluate(() => {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  });

  const middleOfPage = pageHeight / 2;

  await page.evaluate((y) => {
    window.scrollTo(0, y);
  }, middleOfPage);

  await page.waitForTimeout(1000);
  //await page.screenshot({ path: 'quote.png' });

  //sjajan citat
  const quoteText = "Opasan, baš opasan";
  const pageContent = await page.content();

  expect(pageContent).toContain(quoteText);

  console.log('Assertion 2 passed: Text found on the page:', quoteText);

});
