
const puppeteer = require('puppeteer')


const http = require('http')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



async function scrapeUrl(txt) {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage()

    await page.goto(url)

    const data = await page.evaluate(() => {
        const img = document.querySelectorAll('img')
        const urls = Array.from(img).map(v => v.src)
        return urls
    })

    await browser.close()
    // console.log(typeof data)
    return data
}

const final = scrapeUrl('https://www.instagram.com/rafayx77')