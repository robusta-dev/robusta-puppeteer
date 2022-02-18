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

# Creating a new version
1. Build and tag the new image. Assuming the tag is NEW_TAG

`docker build . -t us-central1-docker.pkg.dev/genuine-flight-317411/devel/grafana-renderer:NEW_TAG`
2. Push the new image: 

`docker push us-central1-docker.pkg.dev/genuine-flight-317411/devel/grafana-renderer:NEW_TAG`
3. In the `robusta-runner`, update the renderer to the new image tag
