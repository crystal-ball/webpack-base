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

module.exports = env => {
  const paths = {
    appDist: resolveApp('dist'), // NOTE /dist instead of create-react-app /build
    appHtml: resolveApp('public/index.html'),
    appPackageJson: resolveApp('package.json'),
    appPublic: resolveApp('public'),
    appSrc: resolveApp('src'),
    babelLoaderInclude: [resolveApp('src')],
    nodeModules: resolveApp('node_modules'),
    yarnLockFile: resolveApp('yarn.lock'),
  };

  // Handle dev vs production relative paths
  if (env === 'production') {
    // Prod - include chunkhash for cache busting
    paths.outputFilename = '[name].[chunkhash].js';
    paths.appEntry = [
      resolveApp('src/index.js'),
    ];
  } else {
    // Dev no chunkhash, not needed
    paths.outputFilename = '[name].js';
    // Dev include hot-loader
    paths.appEntry = [
      'react-hot-loader/patch',
      resolveApp('src/index.js'),
    ];
  }

  return paths;
};
