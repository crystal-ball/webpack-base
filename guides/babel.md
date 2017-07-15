## Babel Configuration

The configs in this package include adding the `babel-loader` to load JS files, but
does not configure Babel. Consuming projects must set their own Babel configurations
in a `.babelrc` file.

#### Suggested Babel Plugins:

**Production**
- `transform-react-remove-prop-types`
- `transform-runtime`
