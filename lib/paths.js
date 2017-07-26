'use strict';

const { realpathSync } = require('fs');
const { resolve } = require('path');

// From create-react-app
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = realpathSync(process.cwd());
function resolveApp(relativePath) {
  return resolve(appDirectory, relativePath);
}

module.exports = (env, paths = {}) => {
  const defaultPaths = {
    appDist: resolveApp('dist'), // NOTE /dist instead of create-react-app /build
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appPublic: resolveApp('public'),
    appSrc: resolveApp('src'),
    babelLoaderInclude: [resolveApp('src')],
    nodeModules: resolveApp('node_modules'),
    yarnLockFile: resolveApp('yarn.lock')
  };

  // Assign any configured paths to default paths
  const resolvedPaths = Object.assign(defaultPaths, paths);

  // Handle dev vs production relative paths
  if (env === 'production') {
    // Prod - include chunkhash for cache busting
    resolvedPaths.outputFilename = '[name].[chunkhash].js';
    resolvedPaths.appEntry = [resolvedPaths.appIndexJs];
  } else {
    // Dev no chunkhash, not needed
    resolvedPaths.outputFilename = '[name].js';
    // Dev include hot-loader
    resolvedPaths.appEntry = ['react-hot-loader/patch', resolvedPaths.appIndexJs];
  }

  return resolvedPaths;
};
