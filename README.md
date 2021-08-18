# Introduction
This is a service for rendering grafana panels to an image using a headless browser.
Unlike the grafana rendering plugin, this doesn't require configuring anything in grafana itself.

# Instructions
1. Install dependencies: `npm install`
2. Run: `npm run start`
3. Call the service rest API: 

POST

http://127.0.0.1:8281/render

post data:

{
    "apiKey": "SOME GRAFANA KEY",
    "panelUrl": "SOME GRAFANA PANEL URL"
}

