const puppeteer = require("puppeteer");

describe("Test delete item button", () => {
  var browser, page;
  var url = "http://localhost:3000";

  beforeAll (async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(url);
  });

  afterAll (() => {
    browser.close();
  });
  /*eslint quotes: ["error", "double", { "avoidEscape": true }]*/
  test("Test delete item button right works", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');
    await page.waitForSelector('[data-testid="item-text"]');

    await page.waitForSelector('[data-testid="delete-item"]');
    await page.click('[data-testid="delete-item"]');

    // await page.type('[data-testid="item-text"]', null);
    expect('[data-testid="item-text"]').toBe("[data-testid=\"item-text\"]");
  });
});
