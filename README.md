<div align="right">
  <img height=75 src="./docs/assets/readme-header.png" alt="webpack-base">
</div>

---

<div align="center">
<!-- prettier-ignore-start -->
  <a href="https://www.npmjs.com/package/@crystal-ball/webpack-base">
    <img src="https://img.shields.io/npm/v/@crystal-ball/webpack-base.svg?style=flat-square" alt="NPM version">
  </a>
  <a href="https://travis-ci.com/crystal-ball/webpack-base">
    <img src="https://travis-ci.com/crystal-ball/webpack-base.svg?branch=master" alt="Travis build status">
  </a>
  <a href="https://codeclimate.com/github/crystal-ball/webpack-base/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/b96df9f9f2fb844ee580/maintainability" />
  </a>
  <a href="https://codeclimate.com/github/crystal-ball/webpack-base/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/b96df9f9f2fb844ee580/test_coverage" />
  </a>
  <a href="https://renovatebot.com/">
    <img src="https://img.shields.io/badge/Renovate-enabled-32c3c2.svg" alt="Dependency versions managed by Renovate" />
  </a>
  <a href="https://github.com/crystal-ball/webpack-base#zenhub">
    <img src="https://img.shields.io/badge/shipping_faster_with-ZenHub-5e60ba.svg?style=flat-square" alt="ZenHub" />
  </a>
  <!-- <a href="https://prettier.io/">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier">
  </a> -->
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
<!-- prettier-ignore-end -->
</div>

<p>
  <em>This package generates a base webpack configuration and dependencies for
  React web and Electron applications. Users can customize the generated base
  configurations to meet the specific needs of any project.</em>
</p>

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

**1. Install**

```bash
npm i -D @crystal-ball/webpack-base
```

**2. Add `package.json` commands**

```json
{
  "scripts": {
    "build": "NODE_ENV=production webpack --mode=production",
    "start": "NODE_ENV=development webpack-dev-server --mode=development"
  }
}
```

**3. Add configuration files**

Add configuration files for webpack and Babel to the project root. The
[@crystal-ball/react-application-prototype][] is a complete working reference
application using this package. Projects require a:

- `.babelrc.js`
- `.eslintrc.js`
- `webpack.config.js`

## 📦 Project defaults

Out of the box all of the webpack-base loaders and plugins will work with
projects that use the default project directory structure:

```
project
├─ / src
│  └─ / api
│  └─ / components
│  └─ / dux
│  └─ / media
│  │  └─ / icons
│  └─ / styles
│  │  └─ / dev
│  │  └─ / prod
│  └─ / utils
│  ├─  index.html
│  ├─  index.js
│  └─  index.scss
├─ / static
│  └─  favicon.ico
├─  .babelrc.js
├─  .eslintrc.js
└─  webpack.config.js
```

### Directories

- **src** - Project source code root directory. Imports relative to this
  directory can be made with the `@` alias.
- **src/media/icons** - The SVG symbol sprite loader will sprite any SVG icons
  imported from this directory.
- **src/styles** - SCSS files in this directory can be imported with the `@`
  alias from anywhere in the project. Files in the dev and prod directory will
  be resolved based on the `NODE_ENV`
- **src/api**, **src/components**, **src/dux** and **src/utils** - Suggested but
  not required directory structure for organizing application code by domain
- **static** - The static folder can be used as an escape hatch for including
  assets that are not directly imported in the project code. The contents are
  copied to the output directory during builds.

## 📝 Configuration API

The project `webpack.config.js` should call the webpack-base package to generate
a base configuration. The base configuration can then be modified in any way to
support specific project needs.

```javascript
// webpack.config.js
const webpackBase = require('@crystal-ball/webpack-base')

module.exports = () => {
  const { configs } = webpackBase(/* options */)

  /*
   * Handle non-standard, advanced project customization by directly updating
   * the generated base configs.
   */
  configs.rules.push({
    /* some custom loader */
  })

  return configs
}
```

### Options

The base configurations generated by the package can be customized by passing an
options object:

```javascript
const { configs } = webpackBase{
  devServer,
  envVars
  paths,
  target,
})
```

### Available path configs

```javascript
const paths = {
  /**
   * Project root directory that is used by webpack (eg to handle resolutions).
   * webpack base attempts to automatically set the project context, but it
   * can help fix resolution errors to specify it.
   * @default /
   */
  context,
  /**
   * SVG files imported from these directories will be loaded+sprited using the
   * `SVGSymbolSprite` package.
   * @default ['/src/media/icons']
   */
  iconSpriteIncludes,
  /**
   * JS files imported from these directories will be loaded using the JS loader.
   * @default ['/src']
   */
  jsLoaderIncludes,
  /**
   * Build assets are emitted to this directory.
   * @default /public
   */
  output,
  /**
   * SCSS files in these directories can be imported in other SCSS files using
   * relative imports. (Useful for importing shared variables or mixins inside
   * component style files)
   * @default ['/src/styles', '/src/styles/[dev|prod]]
   */
  sassIncludes,
  /**
   * Application source files directory. The directory is added to the webpack
   * alias config as `@` to allow using imports relative to the source
   * directory.
   * @default /src
   */
  src,
  /**
   * Application public static files directory. This directory is copied to the
   * build without manipulation by the `CopyWebpackPlugin` and provides an
   * escape hatch to include assets in a build without importing them in the
   * application source.
   * @default /static
   */
  static,
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
- Import paths case is verified to ensure Linux and MacOS compatability

### Relative import alias

Relative imports can be made from the `src` file using an `@`:

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

| Constant      | Usage                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| `NODE_ENV`    | Defaults to match NODE_ENV, used by Babili to strip code in prod builds       |
| `DEBUG`       | Defaults to false, can be used for adding detailed logging in dev environment |
| `PUBLIC_PATH` | Defaults to '/', useful for importing media and configuring CDN paths         |

Additional environment variables can be passed in an `envVars` option and they
will be injected into the build

```js
webpackBase({
  envVars: { TRACKING_ID: 'x-123456' },
})
```

## ⚛️ Electron support

Electron renderer processes can be bundled by passing a `target` flag in
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

The configured loaders and plugins can be accessed directly in the return value,
this is useful when setting up Storybook to pass additional loaders and plugins.

```javascript
// webpack.config.js
const webpackBase = require('@crystal-ball/webpack-base')

module.exports = () => {
  const { loaders, plugins } = webpackBase(/* options */)
}
```

#### Returned loaders

```js
config.loaders = {
  jsLoader,
  sassLoader,
  svgSpriteLoader,
  svgComponentLoader,
  fileLoader,
  rawLoader,
}
```

#### Returned plugins

```js
config.plugins = {
  progressBarPlugin,
  environmentPlugin,
  htmlPlugin,
  svgSymbolSpritePlugin,
  copyPlugin,
  hotModuleReplacementPlugin,
  friendlyErrorsPlugin,
}
```

This can be useful for adding loaders to projects like Storybook.

## 👷‍♀️ Developing

Development and testing of the repository use a Docker workflow to ensure that
the generated configs work with the packages required and the minimum version of
Node supported:

```sh
# Build the image and start the container
npm run container

# Start the webpack-dev-server 🎉
npm run start:docker
```

## ✅ Testing

Unit tests are run with Jest and use snapshots to validate the generated configs
for development and production environments.

## 🗺 Roadmap

_Interested in contributing? Start here 😍_

- [ ] Investigate usage of [profile][] in builds
- [ ] Investigate including [Bundle Buddy][bundle] plugin

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
<!-- prettier-ignore-start -->
[bundle]: https://github.com/samccone/bundle-buddy
[@crystal-ball/react-application-prototype]: https://github.com/crystal-ball/react-application-prototype
[profile]: https://webpack.js.org/configuration/other-options/#profile
<!-- prettier-ignore-end -->
