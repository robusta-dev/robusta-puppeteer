# Introduction
This is a proof of concept for rendering grafana panels to an image using a headless browser.
Unlike the grafana rendering plugin, this doesn't require configuring anything in grafana itself.

# Instructions
1. Set an apiKey in `grafana.ts` and update the url to a valid urlPanel
2. Install dependencies: `npm install`
3. Run: `npm run start`

The result should now be saved as `example.png`

# TODO
* Containerization: see https://github.com/buildkite/docker-puppeteer