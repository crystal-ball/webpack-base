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
 * Validates paths used for defining configuration. Any paths not explicitly set
 * will be set to defaults.
 * @param {Object} options The options object passed to index function used to
 * configure paths.
 */
export default function validatePaths({ env, paths }) {
  /**
   * Default project paths used when not specified in `webpackConfigs` options.
   */
  const defaultPaths = {
    /**
     * Application index entry point. Is used as the default app entry if `appEntry`
     * is not specified.
     *
     * | | |
     * --- | ---
     * Default | `src/index.jsx`
     * @type {File}
     */
    appIndexJs: resolveApp('src/index.jsx'),
    /**
     * Application public static files.
     *
     * | | |
     * --- | ---
     * Default | `public`
     * Consumer | `CopyWebpackPlugin`
     * @type {Directory}
     */
    appPublic: resolveApp('public'),
    /**
     * Application source code.
     *
     * | | |
     * --- | ---
     * Default | `src`
     * Consumer | `webpack.resolve.modules`
     * @type {Directory}
     */
    appSrc: resolveApp('src'),
    /**
     * Application source files that will be loaded transpiled with Babel
     *
     * | | |
     * --- | ---
     * Default | `[src]`
     * Consumer | `babel-loader`
     * @type {Array<Directory|File>}
     */
    babelLoaderInclude: [resolveApp('src')],
    /**
     * Template `index.html` used for generating project `index.html` with injected
     * build assets.
     *
     * | | |
     * --- | ---
     * Default | `public/index.html`
     * Consumer | `HtmlWebpackPlugin`
     * @type {File}
     */
    htmlTemplate: resolveApp('public/index.html'),
    /**
     * SVG assets that will be loaded using SVG icon system.
     *
     * | | |
     * --- | ---
     * Default | `[src/media/icons]`
     * Consumer | `svg-sprite-loader`
     * @type {Array<Directory|File>}
     */
    iconsSpriteLoader: [resolveApp('src/media/icons')],
    /**
     * Application `node_modules`
     *
     * | | |
     * --- | ---
     * Default | `node_modules`
     * Consumer | `webpack.resolve.modules`
     * @type {Directory}
     */
    nodeModules: resolveApp('node_modules'),
    /**
     * Name used for bundle output index.js file. _(Chunk hash included in
     * production only for cache busting)_.
     *
     * | | |
     * --- | ---
     * Default | `static/js/[name].[chunkhash].js`
     * Consumer | `webpack.output.filename`
     * @memberof defaultPaths
     * @type {string}
     */
    outputFileName:
      env === 'production'
        ? 'static/js/[name].[chunkhash].js'
        : 'static/js/[name].js',
    /**
     * Target for built Webpack bundle assets
     *
     * | | |
     * --- | ---
     * Default | `build`
     * Consumer | `webpack.output.path`
     * @type {Directory}
     */
    outputPath: resolveApp('build'),
    /**
     * Prefix appended to all emitted assets, can be used with a CDN or server
     * subdirectory.
     *
     * | | |
     * --- | ---
     * Default | `/`
     * Consumer | `webpack.output.publicPath`
     * @type {string}
     */
    publicPath: '/',
  }

  /* eslint-disable no-param-reassign */

  /**
   * Entry points into application.
   *
   * | | |
   * --- | ---
   * Default | `[src/index.jsx]`
   * Consumer | `webpack.entry.app`
   * @memberof defaultPaths
   * @type {Array<File>}
   */
  // hot-loader doesn't do anything in prod, so we include it always for simplicity
  paths.appEntry = paths.appEntry || ['react-hot-loader/patch', paths.appIndexJs]

  // Decorate any missing paths with defaults. Don't reassign or change passed paths
  // b/c of editor issues with resolving modules used for eslint-plugin-import
  Object.keys(defaultPaths).forEach(configPath => {
    if (!paths[configPath]) paths[configPath] = defaultPaths[configPath]
  })

  return paths
}
