
const puppeteer = require('puppeteer')
async function scrapeUrl(url) {
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
  //console.log("pupeeteer done")
  
  return data
}
(async ()=>{
const http = require('http')
const hostname = '127.0.0.1';
const port = 3000;
const data = await scrapeUrl(process.env.URL)

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  
  res.write(JSON.stringify(data))
  
  res.end();
  
  //console.log("server completed")
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
})()

// URL=https://www.instagram.com/rafayx77 node script.js


//scrapeUrl('https://www.instagram.com/rafayx77')