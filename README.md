# InspireScript Webpack Configs
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This package creates the base Webpack configuration for InspireScript projects. The
exported function expects an options object with the build environment. An optional
paths object can be used to customize build behavior.

## Installation
```bash
npm i -D @inspire-script/webpack-configs
```

## Usage:
```javascript
// webpack.config.js
const { resolve } = require('path')
const configs = require('@inspire-script/webpack-configs')

module.exports = env =>
  configs({
    env,
    paths: {
      context: resolve(__dirname)
    }
  })
```

The environment variable should be declared in the webpack build script with `--env`:
```bash
NODE_ENV=production webpack --env=production --progress --profile --colors
```

## Project Structure
Build defaults use the following directory structure:
```
project
├─  public
│  ├─  index.html
│  └─  favicon.ico
├─  src
│  └─  index.jsx
├─  .babelrc
└─  webpack.config.js
```

## Default Paths
_See #defaultpaths for the default configuration paths._

Build paths can be overriden by passing configuration paths in the configs options
object:

```javascript
const configs = require('@inspire-script/webpack-configs');

// Override appIndexJs to use src/main.js instead of src/index.js
module.exports = env =>
  configs({
    env,
    paths: {
      publicPath: env === 'production' ? 'https://cdn.project/' : '/'
    }
  });
```

## Webpack Resolution
The build configures the following module resolutions for convenient shorthand
imports of common project directories.

Module | Usage
--- | ---
`/src` | Allows relative imports from the src directory, useful for shared utilities
`/src/styles` | Allows importing style variables directly from any SASS partial

## Environment variables
The following environment variables are set by build:

Constant | Usage
--- | ---
`process.env.BABEL_ENV` | Set to match `NODE_ENV` for configuring Babel by environment
`process.env.PUBLIC_PATH` | Set to `publicPath` configuration, useful for importing media and configuring CDN paths

## Guides
- [Project Toolchain][]
- [Project Application][]

#### Tools
- [Babel][]
- [Webpack][]

#### Application
- [Styles][]

[project toolchain]: ./guides/Project Toolchain.md
[project application]: ./guides/Project Application.md
[babel]: ./guides/tools/Babel.md
[webpack]: ./guides/tools/Webpack.md
[styles]: ./guides/application/Styles.md

