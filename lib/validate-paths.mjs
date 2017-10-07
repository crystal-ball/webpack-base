import fs from 'fs'
import path from 'path'

// From create-react-app
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath)
}

export default function configurePaths({ env, paths }) {
  /* eslint-disable no-param-reassign */
  const defaultPaths = {
    appIndexJs: resolveApp('src/index.jsx'),
    appPackageJson: resolveApp('package.json'),
    appPublic: resolveApp('public'),
    appSrc: resolveApp('src'),
    babelLoaderInclude: [resolveApp('src')],
    htmlTemplate: resolveApp('public/index.html'),
    nodeModules: resolveApp('node_modules'),
    outputPath: resolveApp('build'),
    publicPath: '/',
    yarnLockFile: resolveApp('yarn.lock'),
  }

  // Decorate any missing paths with defaults. Don't reassign or change passed paths
  // b/c of editor issues with resolving modules used for eslint-plugin-import
  Object.keys(defaultPaths).forEach(configPath => {
    if (!paths[configPath]) paths[configPath] = defaultPaths[configPath]
  })

  // Handle dev vs production relative paths
  if (env === 'production') {
    // Prod - include chunkhash for cache busting
    paths.outputFilename = paths.outputFilename || 'static/js/[name].[chunkhash].js'
    paths.appEntry = paths.appEntry || [paths.appIndexJs]
  } else {
    // Dev no chunkhash, not needed
    paths.outputFilename = paths.outputFilename || 'static/js/[name].js'
    // Dev include hot-loader
    paths.appEntry = paths.appEntry || ['react-hot-loader/patch', paths.appIndexJs]
  }

  return paths
}

/** Path configurations passed to constructed Webpack configs object. */
export const ConfigurationPaths = {
  /** Entry points into application _(`react-hot-loader` automatically included in
   * development)_ */
  appEntry: '',
  /** File path to application index entry point */
  appIndexJs: '',
  /** File path to application `package.json` */
  appPackageJson: '',
  /** Directory path to application public static assets */
  appPublic: '',
  /** Directory path to application source files */
  appSrc: '',
  /** Directory paths to use TS+Babel loaders with. */
  babelLoaderInclude: '',
  /** File path to `index.html` template file path _(Passed to `HtmlWebpackPlugin`)_
   * */
  htmlTemplate: '',
  /** Directory path to application `node_modules` */
  nodeModules: '',
  /** Name used for bundle output file */
  outputFilename: '',
  /** Directory path used for bundle output target */
  outputPath: '',
  /** Prefix appended to all emitted assets, can be used with a CDN or server
   * subdirectory */
  publicPath: '',
  /** File path to application `yarn.lock` */
  yarnLockFile: '',
}
