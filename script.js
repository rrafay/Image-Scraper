
const puppeteer = require('puppeteer')
const scrollPageToBottom = require('puppeteer-autoscroll-down')
async function scrapeUrl(url) {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage()

  await page.goto(url)

  await scrollPageToBottom(page)

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

const port = 1020;
const data = await scrapeUrl('https://www.reddit.com/r/ProgrammerHumor/')

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  
  res.write(JSON.stringify(data))
  
  res.end();
  
  //console.log("server completed")
});


server.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
})()
