const puppeteer = require('puppeteer');

describe('Test add todo', () => {
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

  test('Timer good works', async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="timer-for-item"]');
    await page.click('[data-testid="timer-for-item"]');
    // await page.waitForSelector('[data-testid="timer-for-item"]');
    // await page.waitForSelector('[data-testid="checkbox-checked"]', { timeout: 6000});
    await page.waitFor(5000);
    await page.waitForSelector('[data-testid="checkbox-checked"]');
  }, 8000);

  
  
}, 8000)
