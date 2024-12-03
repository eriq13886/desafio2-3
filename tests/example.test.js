const expect = require('chai').expect
const { before, after, it } = require('mocha')
const puppeteer = require('puppeteer')

describe('Mi primer prueba abriendo un navegador', () => {
	let browser,page
	
	before(async () => {
		browser = await puppeteer.launch({ headless: false })
		page = await browser.newPage()
	})
	after(async () => {
		await browser.close()
	})

	beforeEach(async () => {
		await page.goto('http://example.com')
	})

	afterEach(async () => {
		await waitForTimeOut(3000)
	})

	it('Debe abrir el navegador y mostrar dos paginas', async () => {
		await page.waitForSelector('h1')
		await page.goto('http://dev.to')
		await page.waitForSelector(
			'#header-search > form > div.crayons-fields.crayons-fields--horizontal > div.crayons-field.flex-1.relative > input.crayons-header--search-input.crayons-textfield'
		)
		await page.goBack()
		await page.waitForSelector('h1')
		await page.goForward()
		await page.waitForSelector(
			'#header-search > form > div.crayons-fields.crayons-fields--horizontal > div.crayons-field.flex-1.relative > input.crayons-header--search-input.crayons-textfield'
		)
	})

	it('Debe abrir el navegador y mostrar dos paginas', async () => {
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.type('#developer-name', 'Javier', { delay: 1000 })
		await page.click('#submit-button', { clickCount: 2 })
		const title = await page.title()
		const url = await page.url()
		console.log('Title: ', title);
		console.log('URL: ', url);
	})

	it('Debe abrir el navegador y mostrar dos paginas', async () => {
		const title = await page.title()
		const url = await page.url()
		const text = await page.$eval('body > div', (element) => element.innerHTML)

		console.log('Title: ', title)
		console.log('URL: ', url)
		console.log('Text: ', text)

	})

	it('Debe abrir el navegador y evaluear enter', async () => {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#searchTerm')
		await page.type('#searchTerm', 'Hola Mundo')
		await page.keyboard.press('Enter', { delay: 10 })
	})

	it('Aserción de título', async () => {
		const title = await page.title()
		const url = await page.url()
		const text = await page.$eval(
			'body > div',
			(element) => element.innerHTML
		)
		expect(title).to.be.equals('Example Domain')
		expect(url).to.include('example')
	})

	it('Dimensiones de navegador desktop', async () => {
		await page.setViewport({ width: 1920, height: 1080 })

		const title = await page.title()
		const url = await page.url()

		console.log('Title: ', title)
		console.log('URL: ', url)
	})

	it('Dimensiones de navegador tablet', async () => {
		const tablet = await puppeteer.KnownDevices['iPad landscape']
		await page.emulate(tablet);

		const title = await page.title()
		const url = await page.url()

		console.log('Title: ', title)
		console.log('URL: ', url)
	})

	it('Dimensiones de navegador Movil', async () => {
		const mobile = await puppeteer.KnownDevices['iPhone X']
		await page.emulate(mobile);

		const title = await page.title()
		const url = await page.url()

		console.log('Title: ', title)
		console.log('URL: ', url)
	})
})

function waitForTimeOut(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}