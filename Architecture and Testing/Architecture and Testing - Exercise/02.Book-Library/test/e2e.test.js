const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://127.0.0.1:5500/02.Book-Library/';

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling", "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
};

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

    it('loads all books', async () => {
        await page.route('**/jsonstore/collections/books', (route, request) => {
            route.fulfill({
                body: JSON.stringify(mockData),
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            });
        });
        await page.goto(host);

        await page.click('text=Load all books');
        await page.waitForSelector('tr');
        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));

        expect(rowData[0]).to.contains('Harry Potter');
        expect(rowData[0]).to.contains('Rowling');
        expect(rowData[1]).to.contains('C# Fundamentals');
        expect(rowData[1]).to.contains('Nakov');
    });

    it('creates book', async () => {
        await page.goto(host);

        await page.fill('input[name=title]', 'Title');
        await page.fill('input[name=author]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Submit')
        ]);
        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });

    it('edit book', async () => {
        await page.goto(host);

        await page.click('text=Load all books');
        await page.locator('table tbody tr:nth-child(1) td:nth-child(3) .editBtn').click();
        await page.fill('text=Edit FORM TITLE AUTHOR Save >> [placeholder="Title..."]', 'Changed');
        await page.click('text=Save');

        await page.click('text=Load all books');

        const title = await page.textContent('tbody tr td');
        expect(title).to.equal('Changed');
    });

    it('delete book', async () => {
        await page.goto(host);

        await page.click('text=Load all books');
        await page.on('dialog', dialog => dialog.accept());
        await page.click('text=Delete');

        await page.click('text=Load all books');

        await page.waitForSelector('tr');

        const rowData = await page.$$eval('tbody tr', rows => rows.length);
        expect(rowData).to.equal(2);
    });
});