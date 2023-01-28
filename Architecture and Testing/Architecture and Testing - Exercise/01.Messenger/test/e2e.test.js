const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://127.0.0.1:5500/01.Messenger/';


describe('E2E test', async function () {
    this.timeout(6000);

    let browser, page;

    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 500 });
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('load messages', async () => {
        await page.goto(host);
        await page.click('text=Refresh');

        const content = await page.inputValue('#messages');
        expect(content).to.contain('George: Hello, guys! :))');
    });

    it('send message', async () => {
        await page.goto(host);

        await page.fill('#author', 'Ramadan');
        await page.fill('#content', 'Hello');

        await page.click('#submit');
        await page.click('#refresh');

        const content=await page.inputValue('#messages');
        expect(content).to.contain('Ramadan: Hello');
    });
});