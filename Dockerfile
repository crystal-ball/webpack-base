FROM node:8.9-alpine as base
LABEL maintainer="hedgecock.d@gmail.com"

WORKDIR /usr/src/app

COPY ./project-template/package.json .
RUN npm install

COPY ./project-template .

EXPOSE 3000
