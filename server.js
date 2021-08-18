const puppeteer = require('puppeteer');
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());

async function renderImage(apiKey, panelUrl) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (request) => {
        const headers = request.headers();
        headers["Authorization"] = "Bearer " + apiKey;
        request.continue({
            headers,
        });
    });
    await page.goto(panelUrl);
    await page.waitForFunction(
        () => {
            const panelCount = document.querySelectorAll(".panel").length || document.querySelectorAll(".panel-container").length;
            return window.panelsRendered >= panelCount;
        },
        {
            timeout: 25 * 1000,
        },
    );
    const imageData = await page.screenshot({ type: "png" });

    await browser.close();
    return imageData;
}

app.post("/render", function (req, res) {
    let apiKey = req.body.apiKey;
    let panelUrl = req.body.panelUrl;
    console.log("Rendering grafana panel: ", panelUrl)
    renderImage(apiKey, panelUrl)
        .then((imageData) => {
            console.log("Grafana panel rendered successfully: ", panelUrl)
            res.end(imageData);
    }).catch((err) => {
        console.log("Failed to render panel %s", panelUrl, err)
        res.status(500).send(err)
    });
})

var server = app.listen(8281, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
