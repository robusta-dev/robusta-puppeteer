FROM node:16-alpine3.11

# Installs latest Chromium (89) package.
RUN apk add --no-cache \
      chromium \
      ca-certificates

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8281

CMD [ "node", "server.js" ]
