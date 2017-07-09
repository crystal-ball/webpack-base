# Webpack, Rollup, Babel - Build Mastery
_Notes on Webpack Rollup and Babel configuration and uses._

## Babel

* Tree Shaking: Using `modules: false` tells Babel not to transpile ESM into CommonJS
modules. Because ESM are statically analyzable this lets bundlers tree shake unused
exports. The unused exports are dropped as part of the uglification process. _(This
  used to require a different preset, babel-preset-es2015-webpack, but as of Babel
  v6.13.0 babel-preset-es2015 supports the modules false option)_

## Webpack

* **entry + include/exclude:** The Webpack `entry` will include all files required
  into your application, but not all of them need to be transpiled by the babel
  loader. The `include` and `exclude` configs for loaders allows more control over
  which files are processed by each loader. EG: your `node_modules` should already be
  transpiled to ES5, so they don't need to be run through the babel-loader. You can
  improve your build times by setting: `exclude: ['node_modules']` as part of the
  `babel-loader` configs.

## Polyfill
Bundle in build or use https://polyfill.io/v2/docs/?

## CSS
Note on using `~` to import from node_modules (sass-loader feature)

## Docs:
**Webpack:** https://webpack.js.org/

# TODO
bail: env.prod
https://babeljs.io/blog/2016/08/30/babili

## Notes:
- not including babel-polyfill as entry before hot loader...
- bable-polyfill vs babel-babel-plugin-transform-runtime
- https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3



Notes:

Step 1:
vendor: 0
app: 100bytes 300bytes

Step 2:
vendor: 0
app: 1.2kb 764bytes

Step 3:
vendor: 1.2kb -> 1.2kb
app: 770bytes -> 738bytes


# Babel + Wepback Optimizations
Tree shaking only occurs with files/exports that are not imported anywhere in the
project. If a file is imported, it is included. (Important for node_modules b/c we're
importing all of the files in index.js so none of them will get dropped in builds).

HOWEVER, files can also be directly imported by a consuming project, and in that case
only those files are pulled in, eg: import Button from 'componentry/Button';

Using `modules: false` in `.babelrc` with the ES transpiling preset is v important
so that the modules aren't transpiled to commonJS modules. CommonJS modules are not
static and so they cannot be tree shaked! ESM are static, which is how the tree
shaking works.

Behind the scenes, webpack bundles all of the code from the project, and marks unused
code with special comments. Then, a minifier (`babili` is totally radical) strips the
dead code.

How Babili is included is v important. If it is used as a `.babelrc` preset, then it
is run on a **per file basis** and it doesn't strip out dead code or minify the
webpack code! The difference is huge between setting `.babelrc` and using the webpack
plugin for Babili, which is run on the **output bundle** and strips all of the dead
code and minimizes the webpack code!

On top of this, the plugin will also run on vendor code from node_modules, and will
do the same dead code + uglify work for vendor. This could be really nice if it's
not possible to have source maps for vendor code in dev?

Library Recommendations:
- Transpile lib code to ES5 in ESM modules for `package.modules`
- Do not minify code -> Use webpack Babili plugin in prod builds to minify
- Use `babel-preset-env` with latest 2 browsers
The end result of this is that ES5 compatible code is available to be imported into
the app as desired. The entire lib can be pulled using imports from `index` OR
individual files can be imported with filepaths for _super_ tight builds.

Base Tools:
- `babel-core` + `babel-loader`
- `babel-plugin-transform-runtime` + `babel-runtime`
- `babel-preset-env` + `babel-preset-react`
- `babili-webpack-plugin` + `webpack.optimize.ModuleConcatenationPlugin` _(Webpack 3 Only)_

Demo File Sizes (App + Vendor):
Nothing: 1.83kb + 1.18kb
.babelrc: 1.71kb + 1.18kb
Plugin: 539bytes + 256bytes
Plugin+Hoisting: 420bytes + 219bytes

3.01kb vs 0.64kb => 78% reduction!


