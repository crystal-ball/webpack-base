# Project Toolchain
InspireScript projects are pre-wired with a default toolchain we hope is easy to get
started with, and easy to customize for any custom requirements.

#### Linting+Formatting
- Prettier: Enforce consistent formatting with no overhead for contributors.
  - Config file: `.prettierrc`
- ESLint:  Enforce consistent code quality practices. The Airbnb ruleset is
  configured with linting for Prettier added.
  - Config file: `.eslintrc.js`

#### Build
- Babel: For transpiling new language features as well as applying performance
  enhancements to production builds. See [Babel Configuration](#babel-configuration)
  for details.
  - Config file: `.babelrc`
- Webpack: For managing _all_ project asset bundling including images, styles,
  public assets, and JS. See [Webpack Configuration](#webpack-configuration) for
  details.
  - Config file: `webpack.config.js`
- ES6 Polyfill: ES6 polyfills are not included in the build bundle. Instead only the
  required polyfills for a specific browser are loaded by including a script calling
  [polyfill.io](polyfill.io) in the `index.html` file.




# TODO:
- Appropriate links for Babel/Webpack md files
- Note on bundling the regenerator-runtime w/ 'transform-runtime'
