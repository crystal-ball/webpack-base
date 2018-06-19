const merge = require('webpack-merge')

const generateConfigs = require('./generate-configs')
const common = require('./common')
const development = require('./development')
const production = require('./production')

/**
 * Crystal ball projects' base webpack configs include configurations for loader
 * definitions, dev server, build indicators, stats, etc. The configurations are
 * specific to environment and can be overriden as needed for custom build
 * requirements.
 * @param {Object} options
 * @param {Object} options.paths
 * @param {Object} options.serve
 * @returns {Object} Base Webpack configurations object.
 */
module.exports = function webpackBase(options) {
  const env = process.env.WEBPACK_SERVE ? 'development' : 'production'

  // Ensure that Babel has the correct environment variable for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || env

  const configs = generateConfigs(options)

  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  return env === 'production'
    ? merge(common(configs), production(configs))
    : merge(common(configs), development(configs))
}
