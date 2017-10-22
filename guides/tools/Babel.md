# Babel Configuration
The [`babel-loader`][babel-loader] is included in the webpack configurations to
transpile project JavaScript with Babel. In addition to transpiling new language
features there are a number of performance plugins for Babel that optimize the
production build bundle.

The `.babelrc` file configures which presets and plugins should be used for each
build environment. By default the `babel-preset-env` preset is used to transpile
only the language features required for targeted browsers. _(Work is planned to emit
seperate bundles for modern browsers vs legacy browsers)_ The following presets/
plugins are configured by default:

#### Language feature transpiling
- [`babel-preset-env`][preset-env]: Autoprefixer for Babel compiling
- [`babel-preset-react`][preset-react]: Transform JSX into `createElement` calls
- [`transform-runtime`][runtime]: Externalise references to helpers and builtins,
  automatically polyfilling your code without polluting globals
- [`babel-plugin-transform-class-properties`][class-properties]: Transform es2015
  static class properties and es2016 property initializer syntax
- [`babel-plugin-transform-object-rest-spread`][object-spread]: Transform rest
  properties for object destructuring assignment and spread properties for object
  literals
- [`babel-plugin-syntax-trailing-function-commas`][trailing-commas]: Compile
  trailing function commas to ES5
- [`babel-plugin-syntax-dynamic-import`][dynamic-import]: Allow parsing of
  `import()`.

#### Development plugins
- [`transform-react-stateless-component-name`][component-name]: Adds a display name
  to functional stateless components.
- [`react-hot-loader/babel`][hot-loader]: Tweak React components in real time.

#### Production optimizations
- [`babel-plugin-react-remove-properties`][remove-properties]: Remove React
  properties
- [`babel-plugin-transform-react-constant-elements`][constant-elems]: Hoist JSX
  elements to highest scope possible
- [`babel-plugin-transform-react-inline-elements`][inline-elems]: Replaces the
  `React.createElement` function with one that is more optimized for production

## Babel env
The Babel environment variable `BABEL_ENV` handles specifying the target `env` in
the `.babelrc` configuration. The environment variable is automatically set in the
webpack configs using `NODE_ENV`. If needed a specific `BABEL_ENV` can be included
in the appropriate script, eg:
```shell
BABEL_ENV=jsnext NODE_ENV=production webpack --env=production
```


<!-- Links -->
[babel-loader]: https://github.com/babel/babel-loader
[class-properties]: https://www.npmjs.com/package/babel-plugin-transform-class-properties
[component-name]: https://www.npmjs.com/package/babel-plugin-transform-react-stateless-component-name
[constant-elems]: https://www.npmjs.com/package/babel-plugin-transform-react-constant-elements
[dynamic-import]: https://www.npmjs.com/package/babel-plugin-syntax-dynamic-import
[hot-loader]: https://gaearon.github.io/react-hot-loader/
[inline-elems]: https://www.npmjs.com/package/babel-plugin-transform-react-inline-elements
[object-spread]: https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread
[preset-env]: https://babeljs.io/docs/plugins/preset-env/
[preset-react]: https://babeljs.io/docs/plugins/preset-react/
[remove-properties]: https://www.npmjs.com/package/babel-plugin-react-remove-properties
[remove-props]: https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
[runtime]: https://babeljs.io/docs/plugins/transform-runtime/
[trailing-commas]: https://www.npmjs.com/package/babel-plugin-syntax-trailing-function-commas
