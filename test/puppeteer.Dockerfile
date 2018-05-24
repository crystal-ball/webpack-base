FROM geekykaran/headless-chrome-node-docker:latest

COPY ./ /usr/src/puppeteer

WORKDIR /usr/src/puppeteer

# Install dependencies needed for running acceptance tests
RUN npm install babel-core babel-jest babel-preset-env jest puppeteer

CMD npm run test:acceptance
