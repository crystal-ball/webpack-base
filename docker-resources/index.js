require = require('@std/esm')(module)
// In the container the webpack src files are mounted at /webpack because the
// template project source files are mounted at /src
module.exports = require('./webpack').default
