## Babel Configuration

This package includes additional Babel plugins for transforming language features
and optimizing production builds.

The Webpack configuration exported by this package include the `babel-loader` for
loading JS files, but does not configure Babel. Consuming projects must set their
own Babel configurations in a `.babelrc` file.

## Included Babel Plugins

#### Build Helpers
- [`transform-runtime`](https://babeljs.io/docs/plugins/transform-runtime/)
  Externalise references to helpers and builtins, automatically polyfilling your
  code without polluting globals

#### Language Features
- [`babel-plugin-transform-class-properties`](https://www.npmjs.com/package/babel-plugin-transform-class-properties)
  Transform es2015 static class properties and es2016 property initializer syntax
- [`babel-plugin-transform-object-rest-spread`](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)
  Transform rest properties for object destructuring assignment and spread
  properties for object literals.

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
