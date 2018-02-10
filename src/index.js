const merge = require('webpack-merge')

const validateConfigs = require('./validate-configs')
const common = require('./common')
const development = require('./development')
const production = require('./production')

/**
 * InspireScript projects' base webpack configs include configurations for loader
 * definitions, dev server, build indicators, stats, etc. The configurations are
 * specific to environment and can be overriden as needed for custom build
 * requirements.
 * @param {Object} configs
 * @param {Object} configs.devServer
 * @param {string} configs.env
 * @param {Object} configs.paths
 * @param {number} configs.svgSprites
 * @returns {Object} Base Webpack configurations object.
 */
module.exports = function webpackConfigs(configs = {}) {
  const env = configs.env || 'development'

  // Ensure that Babel has an environment variable for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || env

  const validatedConfigs = validateConfigs(configs)

  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  return env === 'production'
    ? merge(common(validatedConfigs), production(validatedConfigs))
    : merge(common(validatedConfigs), development(validatedConfigs))
}
