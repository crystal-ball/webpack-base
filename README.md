<h1 align="center">🌄 InspireScript webpack Base Configuration</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@inspirescript/webpack-configs">
    <img src="https://img.shields.io/npm/v/@inspirescript/webpack-configs.svg?style=flat-square" alt="current version">
  </a>
  <a href="https://travis-ci.org/inspirescript/webpack-configs">
    <img src="https://travis-ci.org/inspirescript/webpack-configs.svg?branch=master" alt="Build">
  </a>
  <a href="https://greenkeeper.io/" target="_blank" rel="noopener noreferrer">
    <img src="https://badges.greenkeeper.io/inspirescript/webpack-configs.svg">
  </a>
  <a href="https://github.com/prettier/prettier" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="managed by semantic release">
  </a>
</p>

This package creates the base webpack configuration for InspireScript projects.
The exported function expects an options object with the build environment. An
optional paths object can be used to customize build behavior.

## Installation

[![Greenkeeper badge](https://badges.greenkeeper.io/inspirescript/webpack-configs.svg)](https://greenkeeper.io/)

```bash
npm i -D @inspire-script/webpack-configs
```

## Usage

```javascript
// webpack.config.js
const { resolve } = require('path')
const webpackConfigs = require('@inspire-script/webpack-configs')

module.exports = env => {
  const baseConfigs = webpackConfigs({
    env,
    paths: {
      // Explicitly set the context for resolving entry points and loaders
      context: resolve(__dirname),
    },
  })

  /*
   * Make any changes to the base webpack configs for your application, eg:
   * baseConfigs.module.rules.push({ custom loader... })
   */

  return baseConfigs
}
```

The environment variable should be declared in the webpack build script with
`--env`, eg:

```json
{
  "build": "NODE_ENV=production webpack --env=production"
}
```

### Configuring

The base configurations generated by the package can be customized per project
by passing a configuration object.

#### Configurations

```javascript
// The top level overrides allow specifying the build env, dev server
// customizations and default path overrides
const configs = {
  env,
  devServer,
  paths,
}
```

#### Path overrides

```javascript
const paths = {
  /**
   * Application entry point(s) used for the webpack entry. Override to add
   * additional entries like Babel polyfills, multiple application entries, etc.
   * @type {File|Array<File>}
   * @default appIndexJs
   */
  appEntry,
  /**
   * Application index file used as the default entry in the `appEntry`.
   * @type {File}
   * @default src/index.js
   */
  appIndexJs,
  /**
   * Application public static files directory. This directory is copied to the
   * build without manipulation by the `CopyWebpackPlugin` and provides an
   * escape hatch to include assets in a build without importing them in the
   * application source.
   * @type {Directory}
   * @default public
   */
  appPublic,
  /**
   * Application source files directory. The directory is added to the webpack
   * `resolve.modules` config to allow using imports relative to the source
   * directory.
   * @type {Directory}
   * @default src
   */
  appSrc,
  /**
   * Directories/files that will be loaded && transpiled with Babel using the
   * `babel-loader`.
   * @type {Array<Directory|File>}
   * @default ['src']
   */
  babelLoaderInclude,
  /**
   * Path to the `index.html` template used by `HtmlWebpackPlugin` to generate
   * the build `index.html` with injected build assets.
   * @type {File}
   * @default public/index.html
   */
  htmlTemplate,
  /**
   * Directories/files that will be loaded && sprited using the
   * `SVGSymbolSprite` system.
   * @type {Array<Directory|File>}
   * @default [src/media/icons]
   */
  iconsSpriteLoaderInclude,
  /**
   * Filename template used for build JS output files. Production builds include
   * the `[chunkhash]` to enable long term caching.
   * @type {string}
   * @default static/js/[name].[production?chunkhash].js
   */
  outputFilename,
  /**
   * Directory that build assets are emitted to.
   * @type {Directory}
   * @default dist
   */
  outputPath,
  /**
   * The prefix appended to every URL created by the runtime or loaders. This
   * enables serving an application with a CDN or server subdirectory.
   * @type {string}
   * @default /
   */
  publicPath,
  /**
   * Directories included in the SASS resolver. Resources in these directories
   * will be available using relative imports. Useful for importing shared SASS
   * resources inside component SASS definitions.
   * @type {Array<Directory>}
   * @default ['src/styles']
   */
  sassIncludePaths,
}
```

## Project structure

Build defaults use the following directory structure:

```
project
├─ / public
│  ├─  index.html
│  └─  favicon.ico
├─ / src
│  └─ / api
│  └─ / components
│  └─ / dux
│  └─ / lib
│  └─ / media
│  └─ / styles
│  └─  index.js
├─  .babelrc
└─  webpack.config.js
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

Development and testing of the repository use a Docker workflow to ensure that
the generated configs work with the packages required and the minimum version of
Node supported. The `/test-app` directory includes a complete test application.

Unit tests are run with Jest and use snapshots to validate the generated configs
for development and production environments.

#### Process

1.  Start the docker container: `npm run container`
1.  After the image/container are created start the dev server: `npm start`

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

## Node version support

Node version running inside Atom's Electron instance is support target to ensure
users of ESLint import plugin are able to parse these webpack configs.

## Roadmap

* [ ] Investigate usage of [profile][] in builds
* [ ] Investigate including [Bundle Buddy][bundle] plugin

<!-- Links -->

[toolchain]: ./guides/Project%20Toolchain.md
[application]: ./guides/Project%20Application.md
[babel]: ./guides/tools/Babel.md
[webpack]: ./guides/tools/webpack.md
[styles]: ./guides/application/Styles.md
[profile]: https://webpack.js.org/configuration/other-options/#profile
[bundle]: https://github.com/samccone/bundle-buddy
