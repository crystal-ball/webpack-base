<div align="right">
  <img src="./assets/project-logo.png" height="100" alt="Crystal Ball webpack base" />
</div>

<hr >

<p align="center">
  <a href="https://www.npmjs.com/package/@crystal-ball/webpack-base">
    <img src="https://img.shields.io/npm/v/@crystal-ball/webpack-base.svg?style=flat-square" alt="NPM version">
  </a>
  <a href="https://travis-ci.com/crystal-ball/webpack-base">
    <img src="https://travis-ci.com/crystal-ball/webpack-base.svg?branch=master" alt="Travis build status">
  </a>
  <a href="https://renovatebot.com/">
    <img src="https://img.shields.io/badge/Renovate-enabled-32c3c2.svg" alt="Dependency versions managed by Renovate" />
  </a>
  <a href="https://github.com/crystal-ball/webpack-base#zenhub">
    <img src="https://img.shields.io/badge/shipping_faster_with-ZenHub-5e60ba.svg?style=flat-square" alt="ZenHub" />
  </a>
  <a href="https://prettier.io/">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier">
  </a>
  <a href="https://semantic-release.gitbook.io">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic_release-e10079.svg" alt="Semantic Release">
  </a>

  <br />
  <a href="https://github.com/crystal-ball">
    <img src="https://img.shields.io/badge/%F0%9F%94%AE%E2%9C%A8-contains_magic-D831D7.svg" alt="Contains magic" />
  </a>
  <a href="https://github.com/crystal-ball/crystal-ball.github.io">
    <img src="https://img.shields.io/badge/%F0%9F%92%96%F0%9F%8C%88-full_of_love-F5499E.svg" alt="Full of love" />
  </a>
</p>

_This package generates a base webpack configuration and requires the necessary
tooling dependencies for React web and Electron applications. Consuming projects
can customize the generated base configurations to meet the specific needs of
any project._

- [Setup](#-setup) - Installation and file setup instructions
- [Project defaults](#=project-defaults) - Documentation on default project
  structure used
- [Configuration API](#-configuration-api) - Documentation on customizing
  generated configurations
- [Featureset](#-featureset) - Overview of the supported magic
- [Electron support](#-electron-support) - Using within an Electron project
- [Docker support](#-docker-support) - Using within a Docker workflow
- [Components access](#-components-access) - Accessing loaders and plugins
  directly
- [Developing](#-developing) - How to develop the project
- [Testing](#-testing) - How to test the project
- [Roadmap](#-roadmap) - TODO items and contributing suggestions
- [Contributing](#-contributing) - Yes please! 😍

## ⚙️ Setup

_ℹ️ See the [`test-app`](./test-app) for a complete example application setup_

### 1. Install

```bash
npm i -D @crystal-ball/webpack-base
```

### 2. Add `package.json` commands

```json
{
  "scripts": {
    "build": "NODE_ENV=production webpack --mode=production",
    "start": "NODE_ENV=development webpack-dev-server --mode=development"
  }
}
```

### 3. Add configuration files

Setup a [`.babelrc`](./test-app/.babelrc) config file and a
[`webpack.config.js`](./test-app/webpack.config.js) config file in the project
root.

#### Babel configuration

Babel configuration should include setting `core-js` options for the
`preset-env` preset and `plugin-transform-runtime` plugin. The CoreJS package
includes polyfills for language features not supported by the compile target. It
is recommended to set the env preset to transform features used with the `usage`
option and the runtime to use helpers instead of global polyfills.

## 📦 Project defaults

webpack base works out of the box for projects with projects that use the
default project structure:

```
project
├─ / public
│  └─  favicon.ico
├─ / src
│  └─ / api
│  └─ / components
│  └─ / dux
│  └─ / lib
│  └─ / media
│  │  └─ / icons
│  └─ / styles
│  │  └─ / dev
│  │  └─ / prod
│  ├─  index.html
│  └─  index.js
├─  .babelrc
├─  .eslintrc.js
└─  webpack.config.js
```

### Directories

- **public** - The public folder can be used as an escape hatch for including
  assets that are not imported by the project. The contents are copied to the
  output directory during builds.
- **src/media/icons** - The SVG symbol sprite loader will sprite any SVG icons
  imported from this directory.
- **src/styles** - SASS files in this directory can be imported with the @ alias
  from anywhere in the project. The `dev` and `prod` directories are passed as
  `importPaths` to `node-sass` according to the build env.
- **src/index.js** - The application entry file.
- **api**, **components**, **dux** and **lib** directories are not required,
  only suggested as a convenient setup.

## 📝 Configuration API

The project `webpack.config.js` should call the webpack base package to generate
the base configuration set. The base configurations can then be modified in any
way to support specific project needs.

```javascript
// webpack.config.js
const webpackBase = require('@crystal-ball/webpack-base')

module.exports = () => {
  const { configs } = webpackBase(/* options */)

  /*
   * Handle non-standard, advanced project customization by directly updating
   * the generated base configs.
   */
  // eg: configs.bail = false

  return configs
}
```

### Options

The base configurations generated by the package can be customized per project
by passing an options object:

```javascript
// The top level overrides allow specifying the build env, dev server
// customizations and default path overrides
const options = {
  devServer,
  envVars
  paths,
  target,
}
```

### Available path configs

```javascript
const paths = {
  /**
   * Application public static files directory. This directory is copied to the
   * build without manipulation by the `CopyWebpackPlugin` and provides an
   * escape hatch to include assets in a build without importing them in the
   * application source.
   */
  appPublic, // ./public
  /**
   * Application source files directory. The directory is added to the webpack
   * alias config as `@` to allow using imports relative to the source
   * directory
   */
  appSrc, // ./src
  /**
   * Project root directory that is used by webpack (eg to handle resolutions).
   * webpack base attempts to automatically set the project context, but it
   * can help fix resolution errors to specify it.
   */
  context, // ./
  /**
   * Directories/files that will be loaded && sprited using the
   * `SVGSymbolSprite` system.
   */
  iconSpritePaths, // [./src/media/icons]
  /**
   * Directories that will be loaded using the JS loader, is passed as the
   * loader `include` property.
   */
  jsLoaderPaths, // [./src]
  /**
   * Directory that build assets are emitted to.
   */
  outputPath, // ./dist
  /**
   * The prefix appended to every URL created by the runtime or loaders. This
   * enables serving an application with a CDN or server subdirectory.
   */
  publicPath, // '/'
  /**
   * Directories included in the SASS resolver. Resources in these directories
   * will be available using relative imports. Useful for importing shared SASS
   * resources inside component SASS definitions.
   */
  sassIncludePaths, // ['src/styles']
}
```

## 😍 Featureset

- JS loader setup to transpile all source in the `babelLoaderInclude` with the
  `babel-loader`
- Appropriate sourcemaps for dev vs prod builds
- Handles adding scripts to `index.html`
- Friendly errors
- Dev server with hot reloading
- Progress indicators
- Production optimizations including uglify and module concatenation
- Output directory cleaning
- Injected `PUBLIC_PATH` for routing
- `DEVTOOL` environment variable will override source maps

### webpack Alias

The build configuration includes an alias to the source directory as `@` for
convenient shorthand imports relative to the project root.

```javascript
// In any JS file
import SomeComponent from '@/components/SomeComponent'
```

```scss
// In any SASS file, note the ~ is required to flag to SASS resolver that this
// is a relative import
@import '~@/styles/theme';
```

### Environment variable injection

The following environment variables are injected by the build:

| Constant                  | Usage                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `process.env.NODE_ENV`    | Defaults to match NODE_ENV, used by Babili to strip code in prod builds                 |
| `process.env.DEBUG`       | Defaults to false, can be used for adding detailed logging in dev environment           |
| `process.env.PUBLIC_PATH` | Set to `publicPath` configuration, useful for importing media and configuring CDN paths |

Additional environment variables can be passed in an `envVars` option and they
will be injected into the build

```
webpackBase({
  envVars: { TRACKING_ID: 'x-123456' }
})
```

## ⚛️ Electron support

Electron renderer processes can be bundled by passing an `target` flag in
options:

```javascript
// webpack.config.js
const webpackBase = require('@crystal-ball/webpack-base')

module.exports = () => {
  return webpackBase({ target: 'electron-renderer' }).configs
}
```

By default `webpack-base` will look for project source files in `/src/renderer`
instead of `/src` and builds are output to `/src/build` instead of `/dist`. This
is for working with Electron build systems.

## 🐳 Docker support

When working within a Docker setup, the dev server port (default `3000`) must be
exposed and the host set to `0.0.0.0`. Including a start command for Docker is
recommended:

```json
{
  "start:docker": "NODE_ENV=development webpack-dev-server --host=0.0.0.0 --mode=development"
}
```

## 🎛 Loader and plugins access

The configured loaders and plugins can be accessed directly in the return value:

```javascript
// webpack.config.js
const webpackBase = require('@crystal-ball/webpack-base')

module.exports = () => {
  const { loaders, plugins } = webpackBase(/* options */)
}
```

#### Returned loaders

```
jsLoader, sassLoader, svgSpriteLoader, svgComponentLoader, fileLoader, rawLoader
```

#### Returned plugins

```
progressBarPlugin, environmentPlugin, htmlPlugin, svgSymbolSpritePlugin, copyPlugin, hotModuleReplacementPlugin, friendlyErrorsPlugin
```

This can be useful for adding loaders to projects like Storybook.

## 👷‍♀️ Developing

Development and testing of the repository use a Docker workflow to ensure that
the generated configs work with the packages required and the minimum version of
Node supported. The `/test-app` directory includes a complete test application.

1.  Start the docker container: `npm run container` (The image/container will be
    created and started)
2.  Start the webpack server for Docker envs: `npm run start:docker`

## ✅ Testing

Unit tests are run with Jest and use snapshots to validate the generated configs
for development and production environments.

## 🗺 Roadmap

_Interested in contributing? Start here 😍_

- [ ] Investigate usage of [profile][] in builds
- [ ] Investigate including [Bundle Buddy][bundle] plugin
- [ ] Add a script to bin to setup necessary configs for a project (`.babelrc`,
      `webpack.config.js`)
- [ ] Add example of each supported feature to `test-app` for quick validation
      that package is working with acceptance tests.
- [ ] Add `svg-symbol-sprite-loader` loader, plugin and example
- [ ] Add a custom _contains-magic_ badge for awesomeness.
- [ ] Setup acceptance tests with Cypress or Puppeteer
- [ ] Add issue and pull request templates

## 👍 Contributing

All contributions are greatly appreciated 👍🎉. To contribute please:

- Review the repo [Code of Conduct](./CODE_OF_CONDUCT.md), it is not just for
  show!
- Review the [Contributing Guide](./CONTRIBUTING.md) for a helpful code overview
  and repository pull request process details.

### Node version support

Node version running inside Atom's Electron instance is support target to ensure
users of ESLint import plugin are able to parse these webpack configs.

<!-- Links -->

[profile]: https://webpack.js.org/configuration/other-options/#profile
[bundle]: https://github.com/samccone/bundle-buddy
