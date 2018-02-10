FROM node:8.9-alpine as base
LABEL maintainer="hedgecock.d@gmail.com"

WORKDIR /usr/src/app

# --- DEPENDENCIES ---

FROM base as depsBuilder

# Copy source and template packages and run merge script to install the same deps
# as listed in current package (vs published package deps)
COPY ./project-template/package.json .
COPY ./package.json ./source.package.json
COPY ./scripts ./scripts
RUN node scripts/prepare-container-install.js
RUN npm install

# --- PROJECT ---

FROM base as project

COPY ./project-template .
COPY --from=depsBuilder /usr/src/app/node_modules ./node_modules
COPY --from=depsBuilder /usr/src/app/package.json ./package.json
COPY ./package.json /usr/src/app/node_modules/@inspirescript/webpack-configs/package.json

EXPOSE 3000
