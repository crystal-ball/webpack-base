## Babel Configuration
The [`babel-loader`](XXX) is included in the Webpack configurations to transpile
project JavaScript with Babel. In addition to transpiling new language features
there are a number of performance plugins for Babel that optimize the production
build bundle.

The `.babelrc` file configures which presets and plugins should be used for each
build environment. By default the `babel-preset-env` preset is used to transpile
only the language features required for targeted browsers. _(Work is planned to emit
seperate bundles for modern browsers vs legacy browsers)_ The following presets/
plugins are configured by default:

#### Language Feature Transpiling
- [`babel-preset-env`](XXX)
- [`babel-preset-react](XXX)
- [`transform-runtime`](https://babeljs.io/docs/plugins/transform-runtime/)
  Externalise references to helpers and builtins, automatically polyfilling your
  code without polluting globals
- [`babel-plugin-transform-class-properties`](https://www.npmjs.com/package/babel-plugin-transform-class-properties)
  Transform es2015 static class properties and es2016 property initializer syntax
- [`babel-plugin-transform-object-rest-spread`](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)
  Transform rest properties for object destructuring assignment and spread
  properties for object literals.
- [`babel-plugin-syntax-trailing-function-commas`](https://www.npmjs.com/package/babel-plugin-syntax-trailing-function-commas)
  Compile trailing function commas to ES5

#### Production Optimizations
- [`babel-plugin-transform-react-remove-prop-types`](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types)
  Remove unnecessary React propTypes from the production build.
- [`babel-plugin-react-remove-properties`](https://www.npmjs.com/package/babel-plugin-react-remove-properties) Remove
  React properties
- [`babel-plugin-transform-react-constant-elements`](https://www.npmjs.com/package/babel-plugin-transform-react-constant-elements)
  Hoist JSX elements to highest scope possible
- [`babel-plugin-transform-react-inline-elements`](https://www.npmjs.com/package/babel-plugin-transform-react-inline-elements)
  Replaces the `React.createElement` function with one that is more optimized for
  production

## Babel env
The Babel environment variable `BABEL_ENV` handles specifying the target `env` in
the `.babelrc` configuration. The environment variable is automatically set in the
Webpack configs using `NODE_ENV`. If needed a specific `BABEL_ENV` can be included
in the appropriate script, eg:
```shell
BABEL_ENV=jsnext NODE_ENV=production webpack --env=production
```

## Babel getting started resources
XXX
