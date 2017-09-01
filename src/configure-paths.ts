import { realpathSync } from 'fs'
import { resolve } from 'path'

import { Envs, ConfigurationPaths, Paths } from './annotations'

// From create-react-app
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = realpathSync(process.cwd())
function resolveApp(relativePath: string) {
  return resolve(appDirectory, relativePath)
}

export interface Options {
  env: Envs
  paths: ConfigurationPaths
}

export default function configurePaths({ env, paths }: Options): Paths {
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
    yarnLockFile: resolveApp('yarn.lock')
  }

  // Assign any configured paths to default paths
  const resolvedPaths = Object.assign(defaultPaths, paths) as Paths

  // Handle dev vs production relative paths
  if (env === 'production') {
    // Prod - include chunkhash for cache busting
    resolvedPaths.outputFilename = '[name].[chunkhash].js'
    resolvedPaths.appEntry = [resolvedPaths.appIndexJs]
  } else {
    // Dev no chunkhash, not needed
    resolvedPaths.outputFilename = '[name].js'
    // Dev include hot-loader
    resolvedPaths.appEntry = ['react-hot-loader/patch', resolvedPaths.appIndexJs]
  }

  return resolvedPaths
}
