const puppeteer = require('puppeteer')

var run = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.tudogostoso.com.br/busca?page=60&q=Farofa')
  await page.screenshot({path: 'tudogostoso.png'})
  
  await browser.close()
}

run()