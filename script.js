const puppeteer = require('puppeteer')
const prompts = require('prompts');

(async () => {
    const response = await prompts({
        type: 'text',
        name: 'url',
        message: 'Paste a link to scrape pictures',

    });

    console.log(response);
    scrapeUrl(response.url)
})();

async function scrapeUrl(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url)

    const data = await page.evaluate(() => {
        const img = document.querySelectorAll('img')
        const urls = Array.from(img).map(v => v.src)
        return urls
    })

    await browser.close()
    console.log(data)
    return data
}
