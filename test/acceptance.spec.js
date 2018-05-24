const puppeteer = require('puppeteer')

let browser
let page
const height = 1080
const width = 1920
// In CI Docker will automatically resolve the app container
const host = `http://${process.env.CI ? 'test' : 'localhost'}:5000`

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: [
      `--window-size=${width},${height}`,
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
    ],
  })
  page = await browser.newPage()
  await page.goto(host)
})

describe('application renders', () => {
  test('title renders', async () => {
    const title = await page.$eval('h1', h1 => h1.innerHTML)
    expect(title).toEqual('InspireScript')

    const imgSrc = await page.$eval('img', image => image.src)
    expect(imgSrc).toEqual(
      expect.stringMatching(/\/static\/media\/Hood-dan-hawk\.[a-z0-9]+?\.jpg/)
    )
  })

  test('navigates to /magic-markdown', async () => {
    const navigationPromise = page.waitForNavigation()
    await page.click('a[href="/magic-markdown"]')
    await navigationPromise

    const title = await page.$eval('h1', h1 => h1.innerHTML)
    expect(title).toEqual('🔮 InspireScript Magic Markdown')
  })
})

afterAll(async () => {
  await browser.close()
})
