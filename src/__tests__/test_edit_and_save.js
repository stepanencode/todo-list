const puppeteer = require("puppeteer");

describe("Test edit and save buttons into item", () => {
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
  test("Edit and Save buttons", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="edit-button"]');
    await page.click('[data-testid="edit-button"]');
    await page.waitForSelector('[data-testid="item-text-input"]');
    await page.click('[data-testid="item-text-input"]');
    await page.type('[data-testid="item-text-input"]', " edit");

    const itemEditSave = await page.$eval('[data-testid="item-text-input"]', el => el.value);
    expect(itemEditSave).toEqual("test text edit");

    await page.waitForSelector('[data-testid="save-button"]');
    await page.click('[data-testid="save-button"]');
    await page.waitForSelector('[data-testid="item-text"]');

    const itemEditing = await page.$eval('[data-testid="item-text"]', node => node.innerText);
    expect(itemEditing).toBe("test text edit");
  });
});
