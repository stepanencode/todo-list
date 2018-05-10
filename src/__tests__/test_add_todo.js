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

  test('Add todo item works good with submit button', async () => {
    await page.goto(url);
    await page.waitForSelector('[data-testid="input-add-item"]');
    await page.click('[data-testid="input-add-item"]');
    await page.type('[data-testid="input-add-item"]', "test text");
    await page.click('[data-testid="submit-button"]');

    await page.waitForSelector('[data-testid="item-text"]');
    const itemText = await page.$eval('[data-testid="item-text"]', el => el.innerHTML);
    expect(itemText).toEqual("test text");
  });

  test('Submit todo item without text raise alert dialog', async () => {
    page.on('dialog', async dialog => {
        const dialogMessage = dialog.message()
        expect(dialogMessage).toEqual("Text must not be empty");
        await dialog.dismiss();
      });

    await page.goto(url);
    await page.click('[data-testid="submit-button"]');
  });
  


// test('Add todo item works good with submit button', async () => {
//     await page.goto(url);
//     await page.waitForSelector('[data-testid="input-add-item"]');
//     await page.click('[data-testid="input-add-item"]');
//     await page.type('[data-testid="input-add-item"]', "test text1");
//     await page.click('[data-testid="submit-button"]');

//     await page.click('[data-testid="input-add-item"]');
//     await page.type('[data-testid="input-add-item"]', "test text2");
//     await page.click('[data-testid="submit-button"]');

//     await page.click('[data-testid="input-add-item"]');
//     await page.type('[data-testid="input-add-item"]', "test text3");
//     await page.click('[data-testid="submit-button"]');

 
//     await page.waitForSelector('[data-testid="item-text"]');
//     const inputText = await page.$eval('[data-testid="item-text"]', el => el.innerHTML);
//     // expect(inputText).toEqual("test text");
//     const result = await page.$$eval('[data-testid="item-text"]', els => els.length);
//     console.log(result)

//     let content = await page.evaluate(() => {
//         let els = [...document.querySelectorAll('[data-testid="item-text"]')];
//         return els.map((el) => el.textContent.trim());
//       });
//     console.log(content);


//   });


})
