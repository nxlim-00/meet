import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  // scenario 1
  test('An event element is collapsed by default', async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    console.log('Waiting for event element to appear...');
    await page.waitForSelector('.event-list');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
    browser.close();
  });
});
