<h1 align="center">InspireScript webpack Base Configuration</h1>

<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen">
  </a>
</p>

This package creates the base webpack configuration for InspireScript projects.
The exported function expects an options object with the build environment. An
optional paths object can be used to customize build behavior.

## Installation

```bash
npm i -D @inspire-script/webpack-configs
```

## Usage

```javascript
// webpack.config.js
const { resolve } = require('path')
const configs = require('@inspire-script/webpack-configs')

module.exports = env =>
  configs({
    env,
    paths: {
      context: resolve(__dirname),
    },
  })
```

The environment variable should be declared in the webpack build script with
`--env`:

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

Build paths can be overriden by passing configuration paths in the configs
options object:

```javascript
const configs = require('@inspire-script/webpack-configs')

// Override appIndexJs to use src/main.js instead of src/index.js
module.exports = env =>
  configs({
    env,
    paths: {
      publicPath: env === 'production' ? 'https://cdn.project/' : '/',
    },
  })
```

## webpack Resolution

The build configures the following module resolutions for convenient shorthand
imports of common project directories.

| Module        | Usage                                                                       |
| ------------- | --------------------------------------------------------------------------- |
| `/src`        | Allows relative imports from the src directory, useful for shared utilities |
| `/src/styles` | Allows importing style variables directly from any SASS partial             |

## Environment variables

The following environment variables are injected by the build:

| Constant                  | Usage                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `process.env.NODE_ENV`    | Defaults to match NODE_ENV, used by Babili to strip code in prod builds                 |
| `process.env.DEBUG`       | Defaults to false, can be used for adding detailed logging in dev environment           |
| `process.env.PUBLIC_PATH` | Set to `publicPath` configuration, useful for importing media and configuring CDN paths |

## Testing

Changes to the build can be tested using the `scripts/prepare-test.js` module.
This will copy the template project into the root directory and update the repo
package with the additional project dependencies. Install the dependencies and
update the webpack config to point to this repo and the `test:` commands should
work.

```shell
node scripts/preprepare-test.js
npm install
```

```javascript
// webpack.config.js
const createBaseConfigs = require('./index')
```

```shell
npm run test:start
npm run test:build
```

## Guides

* [Project Toolchain][toolchain]
* [Project Application][application]

#### Tools

* [Babel][]
* [webpack][]

#### Application

* [Styles][]

## Contributing 😃

All contributions are greatly appreciated 👍🎉. To contribute please:

* Review the repo [Code of Conduct](./CODE_OF_CONDUCT.md), it is not just for
  show!
* Review the [Contributing Guide](./CONTRIBUTING.md) for a helpful code overview
  and repository pull request process details.

<!-- Links -->

[toolchain]: ./guides/Project%20Toolchain.md
[application]: ./guides/Project%20Application.md
[babel]: ./guides/tools/Babel.md
[webpack]: ./guides/tools/webpack.md
[styles]: ./guides/application/Styles.md
