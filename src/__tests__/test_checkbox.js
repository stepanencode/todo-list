const puppeteer = require("puppeteer");

describe("Test checkbox", () => {
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
  test("Press checkbox", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="checkbox"]');
    await page.click('[data-testid="checkbox"]');
    await page.waitForSelector('[data-testid="checkbox-checked"]');

    const itemCheckbox = await page.$eval('[data-testid="checkbox-checked"]', el => el.value);
    expect(itemCheckbox).toBe("on");
  });
});
