import fs from 'fs'
import path from 'path'

/**
 * A project directory
 * @typedef {string} Directory
 */

/**
 * A project file
 * @typedef {string} File
 */

// From create-react-app
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath)
}

/**
 * Validates all configs used to generate base webpack configs. Assigns defaults for
 * any unassigned value.
 * @param {Object} configs The configurations passed to the library.
 */
export default function validateConfigs({
  env = 'development',
  customPaths,
  port,
  svgSprites,
}) {
  const prod = env === 'production'

  // Resolve default index file and app entry based on env, dev includes hot loader
  const defaultIndex = resolveApp('src/index.jsx')
  const defaultEntry = prod
    ? [defaultIndex]
    : ['react-hot-loader/patch', defaultIndex]

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
    appEntry: defaultEntry,
    /**
     * Application index file. This is the single entry point of the app source, it
     * is included in the array of entries used to create chunks within the `entry`
     * configuration.
     * @type {File}
     * @default src/index.jsx
     */
    appIndexJs: defaultIndex,
    /**
     * Application public static files directory. This directory is copied to the
     * build without manipulation by the `CopyWebpackPlugin`
     * @type {Directory}
     * @default public
     */
    appPublic: resolveApp('public'),
    /**
     * Application source directory. This directory is added to the
     * `webpack.resolve.modules` list to allow importing relative to this directory.
     * @type {Directory}
     * @default src
     */
    appSrc: resolveApp('src'),
    /**
     * Files that will be loaded transpiled with Babel using the `babel-loader`.
     * @type {Array<Directory|File>}
     * @default ['src']
     */
    babelLoaderInclude: [resolveApp('src')],
    /**
     * Template `index.html` used by `HtmlWebpackPlugin` to generate build
     * `index.html` with injected build assets.
     * @type {File}
     * @default public/index.html
     */
    htmlTemplate: resolveApp('public/index.html'),
    /**
     * SVG assets that will be loaded using the `svg-symbol-sprite-loader` system.
     * @type {Array<Directory|File>}
     * @default [src/media/icons]
     */
    iconsSpriteLoader: [resolveApp('src/media/icons')],
    /**
     * Project `node_modules` location included in `webpack.resolve.modules` list.
     * @type {Directory}
     * @default node_modules
     */
    nodeModules: resolveApp('node_modules'),
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
    outputPath: resolveApp('build'),
    /**
     * The port that webpack dev server runs on (only used in development)
     * @type {number}
     * @default 3000
     */
    port: port || 3000,
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
    sassIncludePaths: [resolveApp('src/styles')],
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
  Object.assign(defaultConfigs, customPaths || {})

  return defaultConfigs
}
