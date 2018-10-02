const puppeteer = require("puppeteer");


describe("Open Website", () => {
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
  test("Title == React App", async () => {
    await page.goto(url);
    const title = await page.title();
    expect(title).toBe("React App");
  });

  test("Type text works fine", async () => {
    await page.goto(url);
    await page.waitForSelector("input");
    await page.click("input");
    await page.type("input", "test text");

    const inputText = await page.$eval("input", el => el.value);
    expect(inputText).toEqual("test text");
  });
});
