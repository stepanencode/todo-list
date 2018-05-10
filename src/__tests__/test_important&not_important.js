const puppeteer = require('puppeteer');

describe('Test important and not important buttons into item', () => {
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

  test('Important and not important buttons', async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="not-important-item"]');
    await page.click('[data-testid="not-important-item"]');
    await page.waitForSelector('[data-testid="important-item"]');
    await page.click('[data-testid="important-item"]');
 
    const itemImportant = await page.$eval('[data-testid="not-important-item"]', el => el.id);
    expect(itemImportant).toBe("notImportant")
  });
})

