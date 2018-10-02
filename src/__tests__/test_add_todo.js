const puppeteer = require("puppeteer");

describe("Test add todo", () => {
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
  test("Add todo item works good with submit button", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="item-text"]');
    const itemText = await page.$eval('[data-testid="item-text"]', el => el.innerHTML);
    expect(itemText).toEqual("test text");
  });



  test("Submit todo item without text raise alert dialog", async () => {
    page.on("dialog", async dialog => {
      const dialogMessage = dialog.message();
      expect(dialogMessage).toEqual("Text must not be empty");
      await dialog.dismiss();
    });

    await page.goto(url);
    await page.click('[data-testid="submit-button"]');
  });
});
