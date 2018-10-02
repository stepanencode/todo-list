const puppeteer = require("puppeteer");

describe("Test due today and due tomorrow", () => {
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
  test("Due today and Due tomorrow buttons", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="due-today-off"]');
    await page.click('[data-testid="due-today-off"]');
    await page.waitForSelector('[data-testid="due-today-on"]');

    const RemoveDueToday = await page.$eval('[data-testid="due-today-on"]', node => node.innerText);
    expect(RemoveDueToday).toBe("Remove Due Today");

    await page.waitForSelector('[data-testid="due-tomorrow-off"]');
    await page.click('[data-testid="due-tomorrow-off"]');
    await page.waitForSelector('[data-testid="due-tomorrow-on"]');

    const RemoveDueTomorrow = await page.$eval('[data-testid="due-tomorrow-on"]', node => node.innerText);
    expect(RemoveDueTomorrow).toBe("Remove Due Tomorrow");
  });

  test("Due today remove when Due tomorrow pressed", async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="due-today-off"]');
    await page.click('[data-testid="due-today-off"]');
    await page.waitForSelector('[data-testid="due-today-on"]');

    const RemoveDueToday = await page.$eval('[data-testid="due-today-on"]', node => node.innerText);
    expect(RemoveDueToday).toBe("Remove Due Today");

    await page.waitForSelector('[data-testid="due-tomorrow-off"]');
    await page.click('[data-testid="due-tomorrow-off"]');
    await page.waitForSelector('[data-testid="due-tomorrow-on"]');

    const RemoveDueTomorrow = await page.$eval('[data-testid="due-tomorrow-on"]', node => node.innerText);
    expect(RemoveDueTomorrow).toBe("Remove Due Tomorrow");

    await page.waitForSelector('[data-testid="due-today-off"]');
    await page.waitForSelector('[data-testid="due-tomorrow-on"]');

    await page.click('[data-testid="due-today-off"]');
    await page.waitForSelector('[data-testid="due-today-on"]');
    await page.waitForSelector('[data-testid="due-tomorrow-off"]');
  });
});
