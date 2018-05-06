# Use Atom Node verion to ensure users of ESLint import plugin are able to parse
# these webpack configs
FROM node:7.9 as base
LABEL maintainer="hedgecock.d@gmail.com"

WORKDIR /usr/src/app

# Include serve globally for testing production builds
RUN npm install -g serve

# --- DEPENDENCIES ---

FROM base as builder

# Copy source and template packages and run merge script to install the same deps
# as listed in current package (vs published package deps)
COPY ./test-app/package.json .
COPY ./package.json ./source.package.json
COPY ./scripts ./scripts
RUN node scripts/prepare-container-install.js

# --- PROJECT ---

FROM base as project

COPY --from=builder /usr/src/app/package.json ./package.json
RUN npm install

COPY ./test-app .

COPY ./package.json /usr/src/app/node_modules/@inspirescript/webpack-configs/package.json

EXPOSE 3000
EXPOSE 5000
