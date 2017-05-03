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

module.exports = {
  appDist: resolveApp('dist'), // NOTE /dist instead of create-react-app /build
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  babelLoaderInclude: [resolveApp('src')],
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
};
