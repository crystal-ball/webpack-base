FROM node:8.9-alpine as base
LABEL maintainer="hedgecock.d@gmail.com"

WORKDIR /usr/src/app

# ℹ️ The template project package.json and webpack.config.js are setup assuming this
# module is a dependency. The files in /docker-resources modify the project template
# to work with the source files and dependencies from this project mounted as
# volumes. This means that the image should only need to be rebuilt when the node
# deps for the template project or for this project change.
COPY docker-resources .
RUN npm install

EXPOSE 3000
