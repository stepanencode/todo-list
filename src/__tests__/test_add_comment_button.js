const puppeteer = require('puppeteer');

describe('Test add comment button into item', () => {
  var browser, page;
  var url = 'http://localhost:3000'

  beforeAll (async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(url);
  });

  afterAll (() => {
    browser.close()
  });

  test('Add comment button', async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="add-comment"]');
    await page.click('[data-testid="add-comment"]');

  });
})
