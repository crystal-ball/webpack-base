# Project Toolchain

InspireScript projects are pre-wired with a default toolchain we hope is easy to
get started with, and easy to customize for any custom requirements.

#### Linting and formatting

* Prettier: Enforce consistent formatting with no overhead for contributors.
  * Config file: `.prettierrc`
* ESLint: Enforce consistent code quality practices. The Airbnb ruleset is
  configured with linting for Prettier added.
  * Config file: `.eslintrc.js`

<Alert color="warning">
  <Icon id="warning" /> ESLint and Prettier validations are included in the
  project test suite.
</Alert>

#### Build

* Babel: For transpiling new language features as well as applying performance
  enhancements to production builds. See [Babel Configuration][] for details.
  * Config file: `.babelrc`
* webpack: For managing _all_ project asset bundling including images, styles,
  public assets, and JS. See [webpack Configuration][] for details.
  * Config file: `webpack.config.js`
* ES6 Polyfill: ES6 polyfills are not included in the build bundle. Instead only
  the required polyfills for a specific browser are loaded by including a script
  calling [polyfill.io](polyfill.io) in the `index.html` file.

<!-- Links -->

[webpack configuration]: ./tools/webpack.md
[babel configuration]: ./tools/Babel.md
