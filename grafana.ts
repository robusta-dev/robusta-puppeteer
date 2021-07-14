const puppeteer = require('puppeteer');

(async () => {
  // set this apiKey to a grafana apiKey with at least viewer permissions
  const apiKey = "";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:50479/d/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?viewPanel=6&orgId=1&refresh=10s');
  await page.waitForFunction(
    () => {
      const panelCount = document.querySelectorAll('.panel').length || document.querySelectorAll('.panel-container').length;
      return (window as any).panelsRendered >= panelCount;
    },
    {
      timeout: 5 * 1000,
    }
  );
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
