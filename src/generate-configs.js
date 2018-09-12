const fs = require('fs')
const { join } = require('path')

/** Assign default values to any option not specified by consuming applicaiton */
module.exports = function generateConfigs({ paths = {}, serve = {} } = {}) {
  const env = process.env.WEBPACK_SERVE ? 'development' : 'production'

  // Handle default resolution of build specifics off of the source directory, this
  // enables easy source dir configuration without having to specify the path for
  // all downstream source paths
  const context = paths.context || fs.realpathSync(process.cwd())
  const appSrc = paths.appSrc || join(context, 'src')

  // Default project configs used when not specified by consumer, see README for
  // details on values and usage
  // ⚠️ If you change these ensure that the docs in README are updated!
  const defaults = {
    appEntry: join(appSrc, 'index.js'),
    appPublic: join(context, 'public'),
    appSrc,
    babelLoaderInclude: [appSrc],
    htmlTemplate: join(appSrc, 'index.html'),
    iconsSpriteLoaderInclude: [join(appSrc, 'media/icons')],
    outputFilename: `static/js/[name]${env === 'production' ? '.[chunkhash]' : ''}.js`,
    outputPath: join(context, 'dist'),
    publicPath: '/',
    sassIncludePaths: [join(appSrc, '/styles')],
  }

  // 🐳 When running in a Docker environment ports must be known in order to expose them
  // in the Dockerfile and the host must be 0.0.0.0
  if (process.env.DOCKER) {
    /* eslint-disable no-param-reassign */
    serve.host = serve.host || '0.0.0.0'
    serve.hotClient = serve.hotClient || {}
    serve.hotClient.port = serve.hotClient.port || 3001
    /* eslint-enable no-param-reassign */
  }

  // Overwrite the default path configs with any custom paths, pass through the env
  // and serve values
  // ℹ️ Once Atom upgrades to Node 8.9+ this can be cleaned up a lot with object
  // spread
  return Object.assign(defaults, paths, { serve })
}
