import { test, expect } from '@playwright/test';

test('Finding a Tokyo Olumpics article and checking if the comments are correct', async ({ page }) => {
    await page.goto('https://sportklub.n1info.rs/');
    const tagSelector = "#menu-item-13409300 > a";
    await page.hover(tagSelector);
    await page.waitForTimeout(50);
    const tokyoSelector = "#menu-item-13746313 > a";
    await page.click(tokyoSelector);
    await page.waitForTimeout(50);

    const newsSelector = "body > div.featured-zone-homepage > section > div > div > div.left > div.uc-block > article > div.uc-block-post-grid-image";
    await page.click(newsSelector);
    await page.waitForTimeout(50);
    const currentURL = page.url();
    expect(currentURL).toBe('https://sportklub.n1info.rs/tokyo-2020/ex-yu-mix/poi-kakav-podvig-zlato-za-ristica-srebro-za-savanovica/');

    const commentAddSelector = '#post-13819697 > div.uc-all-comments.comments-call-to-action > div > a.uc-dark-btn.has-comments';
    await page.click(commentAddSelector);
    await page.waitForTimeout(50);
    const naslovSelector = '#comments-allComments-log > div:nth-child(2) > div > div > div > div > div > div.Box-root-37C1E.Flex-root-1D41g.coral.coral-comment-topBar.Flex-flex-AOdKg.Flex-justifySpaceBetween-1eGKd.Flex-directionRow-GquEB > div.Box-root-37C1E.Flex-root-1D41g.Flex-flex-AOdKg.Flex-itemGutter-1I3tQ.Flex-alignFlexEnd-1fIG3.Flex-directionRow-GquEB.gutter > div.Box-root-37C1E.Flex-root-1D41g.Flex-flex-AOdKg.Flex-halfItemGutter-1GWGW.Flex-alignCenter-1avOH.Flex-directionRow-GquEB.gutter > div.Popover-root-3VSYu > button > span';
    expect(naslovSelector.textContent,"Prenzos");
    //await page.screenshot({ path: 'page.png' });
    await page.close();
});