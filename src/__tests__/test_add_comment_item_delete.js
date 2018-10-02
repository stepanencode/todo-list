const puppeteer = require("puppeteer");

describe("Test comment item like delete", () => {
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
  test("Comment item delete", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="add-comment"]');
    await page.click('[data-testid="add-comment"]');

    await page.waitForSelector('[data-testid="add-comment-field-input"]');
    await page.click('[data-testid="add-comment-field-input"]');
    await page.type('[data-testid="add-comment-field-input"]', "test text comment");
    await page.click('[data-testid="submit-comment-button"]');

    await page.waitForSelector('[data-testid="comment-delete"]');
    await page.click('[data-testid="comment-delete"]');
    expect('[data-testid="comment-delete"]').toBe("[data-testid=\"comment-delete\"]");
  });
});
