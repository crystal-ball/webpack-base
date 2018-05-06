const fs = require('fs')
const { join } = require('path')

/** Assign default values to any config not specified by consuming applicaiton */
module.exports = function defaultConfigs({
  devServer = {},
  env = 'development',
  paths = {},
}) {
  // Handle default resolution of build specifics off of the source directory, this
  // enables easy source dir configuration without having to specify the path for
  // all downstream source paths
  const context = paths.context || fs.realpathSync(process.cwd())
  const appSrc = paths.appSrc || join(context, 'src')
  const appIndexJs = paths.appIndexJs || join(appSrc, 'index.js')

  // Default project configs used when not specified by consumer, see README for
  // details on values and usage
  // ⚠️ If you change these ensure that the docs in README are updated!
  const defaults = {
    appEntry: appIndexJs,
    appIndexJs,
    appPublic: join(context, 'public'),
    appSrc,
    babelLoaderInclude: [appSrc],
    htmlTemplate: join(context, 'public/index.html'),
    iconsSpriteLoaderInclude: [join(appSrc, '/media/icons')],
    outputFilename: `static/js/[name]${
      env === 'production' ? '.[chunkhash]' : ''
    }.js`,
    outputPath: join(context, 'dist'),
    publicPath: '/',
    sassIncludePaths: [join(appSrc, '/styles')],
  }

  // Overwrite the default path configs with any custom paths, pass through the env
  // and devServer values
  // ℹ️ Once Atom upgrades to Node 8.9+ this can be cleaned up a lot with object
  // spread
  Object.assign({ env, devServer }, defaults, paths || {})

  return defaultConfigs
}
