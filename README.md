# Introduction

This is an optional component of the Robusta Helm chart that is used to render Grafana graphs to png.

It works by rendering grafana panels to an image using a headless browser.
Unlike Grafana's own builtin rendering plugin, this doesn't require configuring anything in Grafana itself.

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

> **NOTE**: The following instructions are for the multi architecture builds,
> so the Robusta can support ARM architectures. If you need local builds, use
> the instruction below.

## New version for multi arch support

1. Build an image using the `build_with_arm.sh` script, where NEW_TAG is the new image tag. **NOTE**: You
   should set up the Google cloud CLI, so it will automatically push the image to the Google cloud.

   `IMAGE=NEW_TAG BUILD_CONTEXT=. ./build_with_arm.sh`

2. In the `robusta-runner`, update the renderer to the new image tag

## New version for only AMD support

1. Build and tag the new image

   `docker build . -t us-central1-docker.pkg.dev/genuine-flight-317411/devel/grafana-renderer:NEW_TAG`

2. Push the new image:

   `docker push us-central1-docker.pkg.dev/genuine-flight-317411/devel/grafana-renderer:NEW_TAG`

3. In the `robusta-runner`, update the renderer to the new image tag
