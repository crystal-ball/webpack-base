const merge = require('webpack-merge')

const defaultConfigs = require('./default-configs')
const common = require('./common')
const development = require('./development')
const production = require('./production')

/**
 * InspireScript projects' base webpack configs include configurations for loader
 * definitions, dev server, build indicators, stats, etc. The configurations are
 * specific to environment and can be overriden as needed for custom build
 * requirements.
 * @param {Object} configs
 * @param {string} configs.env
 * @param {Object} configs.paths
 * @param {Object} configs.serve
 * @returns {Object} Base Webpack configurations object.
 */
module.exports = function webpackConfigs(configs = {}) {
  /* eslint-disable no-param-reassign */
  configs.env =
    configs.env || process.env.WEBPACK_SERVE ? 'development' : 'production'

  const validatedConfigs = defaultConfigs(configs)

  // Ensure that Babel has an environment variable for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || configs.env

  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  return configs.env === 'production'
    ? merge(common(validatedConfigs), production(validatedConfigs))
    : merge(common(validatedConfigs), development(validatedConfigs))
}
