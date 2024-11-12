// Importamos Puppeteer
const puppeteer = require('puppeteer');

(async () => {
  // Abrimos el navegador
  const browser = await puppeteer.launch({ headless: false }); // headless: false abre el navegador en modo visible
  const page = await browser.newPage();

  // Abrimos la página de Google
  await page.goto('https://www.google.com');

  // Mantén el navegador abierto unos segundos antes de cerrar
  await page.waitForTimeout(5000);

  // Cerramos el navegador
  await browser.close();
})();

