# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Code of Conduct
* License

### Changed

* Prettier printWidth set to 80 for markdown files for better readability.
* Nyan indicator replaced with `webpack-dashboard` and
  `progress-bar-webpack-plugin`

### Fixed

* Prettier ignores `package.json`

## [2.21.0] - 2017-12-18

### Added

* Configuration for `commitizen` 🎉
* `svg-symbol-sprite-loader` added for creating SVG symbol sprites

### Changed

* Reduced noise in logged production build stats
* Internal move from `/lib` to `/src`

### Fixed

* `.npmignore` updated to ignore all files unrelated to publish

## [2.20.0] - 2017-11-23

### Added

* `raw-loader` config for importing .txt files
* `<ScrollToTop/>` component in template project
* Simple script to test entire project in `scripts/prepare-test.js`
* Webpack Monitor plugin for interactive build stats

### Fixed

* Flow mocks for markdown, txt and css updated
* Production source-maps are disabled until Babili plugin bug is resolved

### Changed

* Bumped package dependencies ⬆️

## [2.19.0] - 2017-10-22

### Added

* Flow tooling and configuration included by default with docs and examples.

### Fixed

* `.prettierc` missing from generated project
* Corrected `babel-loader` usage for production builds
* Fixed `@inspirescript/webpack-configs` reference in `webpack.config.js`

## [2.18.0] - 2017-10-19

### Changed

* Repo moved to `@inspirescript/webpack-configs`

## [2.17.0] - 2017-10-16

### Added

* Babel plugin `syntax-dynamic-import` to support dynamic imports of SVG files.

### Changed

* The `<Icon />` component is rewritten to dynamically import SVGs using a
  streamlined syntax that allows passing the SVG id as a prop to the icon 🎉🎉🎉

## [2.16.0] - 2017-10-15

### Changed

* React Hot Loader upgrade to v3

## [2.15.0] - 2017-10-12

### Changed

* The ESLint loader is now only used for dev builds. Linting for production
  should be enforced through testing in CI pipeline. This is to improve
  production build times.
* Definitions used for guide links to make raw markdown more readable.

## [2.14.0] - 2017-10-11

### Added

* `classnames` dependency to template project
* Example usage of font icons and locally scoped classes to template project

## [2.13.0] - 2017-10-10

### Added

* Build context in the paths configuration object
* Preliminary SVG icon system with `svg-sprite-loader` and docs

## [2.12.0] - 2017-10-09

### Added

* Template project generator updated with working wiring for application styles
  and state management.

## [2.11.0] - 2017-10-07

### Added

* Generate new project from template using command
  `generate-inspirescript-project`

### Changed

* Bundled dependencies updated

## [2.9.0] - 2017-09-01

### Added

* PostCSS added to production configs to include autoprefixer.

## [2.8.0] - 2017-09-01

### Changed

* Not spending anymore time trying to get TS to play nice. Use spec compliant
  ESM with @std/esm package.

## [2.7.0] - 2017-09-01

### Added

* Pre push testing with `husky`

### Changed

* Deps bumped to latest versions

## [2.6.1] - 2017-08-31

### Fixed

* Added config for esm

## [2.6.0] - 2017-08-31

### Added

* @std/esm for ESModules today!

### Fixed

* App index.js path updated to use .jsx to match expected

## [2.5.0] - 2017-08-17

### Added

* Loader configurations for CSS upgraded to produce readable local path
  namespaces

## [2.4.0] - 2017-08-17

### Added

* Path `publicPath` for configuring build `output.publicPath`

### Fixed

* Path `appDist` renamed to `outputPath` to indicate usage
* Path `appHtml` renamed to `htmlTemplate` to indicate usage

## [2.3.1] - 2017-07-26

### Fixed

* Paths module overriding a configured appIndexJS

## [2.3.0] - 2017-07-26

### Added

* The JS loader will now resolve `.jsx` files
* The application entry can be specified in paths using `appIndexJs`

### Changed

* Project formatted with Prettier and linting updated to Eloquence v2.

## [2.1.1] - 2017-07-17

### Fixed

* Add default alias object to resolve so consuming apps can expect to set
  aliases without checking existence first

## [2.1.0] - 2017-07-15

### Added

* Webpack Visualizer plugin to auto-generate bundle graph for prod builds
* Duplicate package checker plugin
* Guides for Babel && Analyzing

### Fixed

* Vendor chunk updated to include `.json` file content in addition to `.js`

## [2.0.2] - 2017-07-10

### Changed

* Enable `eslint-loader`, is working with classes again

## [2.0.1] - 2017-07-09

### Changed

* Disable `eslint-loader` until https://github.com/babel/babel-eslint/issues/487
  is resolved. Currently class statics are throwing no-undef errors 😔

## [2.0.0] - 2017-07-09

v2 Configs bump to Webpack 3! Enhancements include explicitly setting prod
optimizations to include uglify with Babili and scope hoisting.

Overall flow of module has been cleaned up and does a better job of separating
common, development and production configurations.
