const puppeteer = require("puppeteer");

describe("Test active filter", () => {
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
  test("Active filter is equal one or more empty checkbox", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text1");
    await page.click('[data-testid="submit-button"]');
    await page.waitForSelector('[data-testid="checkbox"]');

    const emptyCheckbox = await page.$$eval('[data-testid="checkbox"]', els => els.length);
    //console.log(emptyCheckbox)

    expect(emptyCheckbox).toBeGreaterThan(0);
  });

  test("Completed filter is equal one or more checked checkbox", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text1");
    await page.click('[data-testid="submit-button"]');
    await page.waitForSelector('[data-testid="checkbox"]');
    await page.click('[data-testid="checkbox"]');
    await page.waitForSelector('[data-testid="checkbox-checked"]');


    const checkedCheckbox = await page.$$eval('[data-testid="checkbox-checked"]', els => els.length);
    //console.log(checkedCheckbox)

    expect(checkedCheckbox).toBeGreaterThan(0);
  });

  test("Mix Active filter is equal one or more empty checkbox and Completed filter is equal one or more checked checkbox", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text1");
    await page.click('[data-testid="submit-button"]');
    await page.waitForSelector('[data-testid="checkbox"]');


    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text1");
    await page.click('[data-testid="submit-button"]');
    await page.waitForSelector('[data-testid="checkbox"]');
    await page.click('[data-testid="checkbox"]');
    await page.waitForSelector('[data-testid="checkbox-checked"]');


    const emptyCheckbox = await page.$$eval('[data-testid="checkbox"]', els => els.length);
    //console.log(emptyCheckbox)

    expect(emptyCheckbox).toBeGreaterThan(0);


    const checkedCheckbox = await page.$$eval('[data-testid="checkbox-checked"]', els => els.length);
    //console.log(checkedCheckbox)

    expect(checkedCheckbox).toBeGreaterThan(0);
  });

  test("Important filter is equal one or more important item", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="not-important-item"]');
    await page.click('[data-testid="not-important-item"]');


    const importantItem = await page.$$eval('[data-testid="important-item"]', els => els.length);
    //console.log(importantItem)

    expect(importantItem).toBeGreaterThan(0);
  });

  test("Due today and Due tomorrow buttons", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="due-today-off"]');
    await page.click('[data-testid="due-today-off"]');

    const dueTodayItem = await page.$$eval('[data-testid="due-today-on"]', els => els.length);
    //console.log(dueTodayItem)

    expect(dueTodayItem).toBeGreaterThan(0);

    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="due-tomorrow-off"]');
    await page.click('[data-testid="due-tomorrow-off"]');

    const dueTomorrowItem = await page.$$eval('[data-testid="due-tomorrow-on"]', els => els.length);
    //console.log(dueTomorrowItem)

    expect(dueTomorrowItem).toBeGreaterThan(0);
  });
});
