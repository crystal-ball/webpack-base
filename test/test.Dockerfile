FROM node:8.11-alpine
LABEL maintainer="hedgecock.d@gmail.com"

WORKDIR /usr/src/app

# Include serve globally for testing production builds
RUN npm install -g serve

# --- DEPENDENCIES ---

# Copy source and template packages and run merge script to install the same deps
# as listed in current package (vs published package deps)
COPY ./test-app/package.json .
COPY ./package.json ./source.package.json
COPY ./scripts ./scripts
RUN node scripts/prepare-container-install.js

# --- PROJECT ---

RUN npm install

# Copy project package to installed version package
COPY ./src /usr/src/app/node_modules/@inspirescript/webpack-configs/src
COPY ./package.json /usr/src/app/node_modules/@inspirescript/webpack-configs/package.json

# Copy test app in to container
COPY ./test-app .
COPY ./guides /usr/src/app/guides

# Run Build
RUN npm run build

# Serve the app in the container on :5000
CMD ["serve", "-s dist"]
