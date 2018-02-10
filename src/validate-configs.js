const fs = require('fs')
const { join } = require('path')

/**
 * A project directory
 * @typedef {string} Directory
 */

/**
 * A project file
 * @typedef {string} File
 */

/**
 * Validates all configs used to generate base webpack configs. Assigns defaults for
 * any unassigned value.
 * @param {Object} configs The configurations passed to the library.
 */
module.exports = function validateConfigs({
  define,
  devServer,
  env = 'development',
  paths,
  svgSprites,
}) {
  const prod = env === 'production'

  // Handle default resolution of build specifics off of the source directory, this
  // enables easy source dir configuration without having to specify the path for
  // all downstream source paths
  const context = paths.context || fs.realpathSync(process.cwd())
  const appSrcDir = paths.appSrc || join(context, 'src')
  const appIndexJs = paths.appIndexJs || join(appSrcDir, 'index.jsx')

  /**
   * Default project paths used when not specified in `webpackConfigs` options.
   */
  const defaultConfigs = {
    /**
     * Array of entry points into application. This can include additional
     * bootstrapping assets like React Hot Loader or Babel polyfills. It includes the
     * `appIndexJS` and is the value used by the `entry` config to create the `app`
     * chunk.
     * @type {Array<File|Directory>}
     * @default ['src/index.jsx']
     */
    appEntry: prod ? [appIndexJs] : ['react-hot-loader/patch', appIndexJs],
    /**
     * Application index file. This is the single entry point of the app source, it
     * is included in the array of entries used to create chunks within the `entry`
     * configuration.
     * @type {File}
     * @default src/index.jsx
     */
    appIndexJs,
    /**
     * Application public static files directory. This directory is copied to the
     * build without manipulation by the `CopyWebpackPlugin`
     * @type {Directory}
     * @default public
     */
    appPublic: join(context, 'public'),
    /**
     * Application source directory. This directory is added to the
     * `webpack.resolve.modules` list to allow importing relative to this directory.
     * @type {Directory}
     * @default src
     */
    appSrc: appSrcDir,
    /**
     * Files that will be loaded && transpiled with Babel using the `babel-loader`.
     * @type {Array<Directory|File>}
     * @default ['src']
     */
    babelLoaderInclude: [appSrcDir],
    /**
     * Environment variables that need to be defined in the build with DefinePlugin.
     * @type {Object}
     * @default {}
     */
    define: define || {},
    /**
     * webpack dev server overrides. Any dev server configurations can be passed
     * in an object and they will have priority when merged with the defaults.
     * @type {Object}
     * @default {}
     */
    devServer: devServer || {},
    /**
     * Template `index.html` used by `HtmlWebpackPlugin` to generate build
     * `index.html` with injected build assets.
     * @type {File}
     * @default public/index.html
     */
    htmlTemplate: join(context, 'public/index.html'),
    /**
     * Directories where SVG assets will be sprited using the
     * `svg-symbol-sprite-loader` system.
     * @type {Array<Directory|File>}
     * @default [src/media/icons]
     */
    iconsSpriteLoader: [join(appSrcDir, '/media/icons')],
    /**
     * Project `node_modules` location included in `webpack.resolve.modules` list.
     * @type {Directory}
     * @default node_modules
     */
    nodeModules: join(context, 'node_modules'),
    /**
     * Name used for bundle output index.js file. _(Chunk hash included in
     * production only for cache busting)_.
     * @type {string}
     * @default static/js/[name].[chunkhash].js
     */
    outputFilename: `static/js/[name]${prod ? '.[chunkhash]' : ''}.js`,
    /**
     * Output directory for webpack build assets.
     * @type {Directory}
     * @default build
     */
    outputPath: join(context, 'build'),
    /**
     * Prefix appended to all emitted assets, can be used with a CDN or server
     * subdirectory.
     * @type {string}
     * @default /
     */
    publicPath: '/',
    /**
     * Sass resolution directories.
     * @type {Array<Directory>}
     * @default ['src/styles']
     */
    sassIncludePaths: [join(appSrcDir, '/styles')],
    /**
     * Array of loader configs that will generate indvidual SVG spritesheets
     * defaults to single sprite:
     *
     * ```javascript
     * [
     *   {
     *     loader: 'svg-symbol-sprite-loader',
     *     options: {
     *       componentName: 'Icon',
     *       importPath: 'media/icons',
     *     },
     *   },
     * ]
     * ```
     * @type {Array}
     */
    svgSprites: svgSprites || [
      {
        loader: 'svg-symbol-sprite-loader',
        options: {
          componentName: 'Icon',
          importPath: 'media/icons',
        },
      },
    ],
  }

  // Overwrite the default path configs with any custom paths
  Object.assign(defaultConfigs, paths || {})

  return defaultConfigs
}
