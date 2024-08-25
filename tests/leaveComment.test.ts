import { test, expect } from '@playwright/test';

test('Leaving a comment on the first article available, will have tendency to fail after new articles', async ({ page }) => {
    await page.goto('https://sportklub.n1info.rs/');
    const articleSelector = 'body > div.featured-zone-homepage > section > div > div > div.left > div.uc-block0 > div.cell.big > article';
    await page.click(articleSelector);
    await page.waitForTimeout(50);

    const url = page.url();
    expect(url).toBe('https://sportklub.n1info.rs/fudbal/srbija-super-liga/trece-poluvreme-vredjali-terzica-a-on-im-odmah-odveo-beka/');
    const addSelector = '#post-15435844 > div.uc-all-comments.comments-call-to-action > div > a.uc-dark-btn.has-comments';

    await page.click(addSelector);
    await page.waitForTimeout(50);

    const commentText = "Strasno!";
    const commenterName = "Tom";

    const textSelector = 'div.comment-input';
    await page.type(textSelector, commentText);
    const nameSelector = '#username-input-for-parent-null';
    await page.type(nameSelector, commenterName);

    const buttonSelector = 'button.fast-comments-reply:nth-child(2)';
    await page.click(buttonSelector);

    await page.waitForSelector('.fastcomments-message', { visible: true });

    const outputText = await page.textContent('.fastcomments-message');

    expect(outputText).toBe('Vaš komentar je uspešno poslat!');


    const nameSelector2 = '#qy1phr8bxCRV > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > b:nth-child(2)';
    const name = await page.textContent(nameSelector2);
    expect(name).toBe(commenterName);
    const written = '#qy1phr8bxCRV > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)';
    const wr = page.textContent(written);
    expect(written).toBe(commentText);
    expect(page.textContent('.awaiting-approval-notice')).toBe('Vaš komentar je poslat i biće prikazan kada bude odobren.');

    await page.reload();
    const commentSection = await page.textContent('.fastcomments-body');
    expect(commentSection).not.toContain(commentText);
    await page.close();
});
