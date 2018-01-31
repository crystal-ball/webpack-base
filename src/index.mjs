import merge from 'webpack-merge'

import validateConfigs from './validate-configs'
import common from './common'
import development from './development'
import production from './production'

/**
 * InspireScript projects' base webpack configs include configurations for loader
 * definitions, dev server, build indicators, stats, etc. The configurations are
 * specific to environment and can be overriden as needed for custom build
 * requirements.
 * @param {Object} options
 * @param {string} options.env
 * @param {Object} options.paths
 * @param {number} options.port
 * @returns {Object} Base Webpack configurations object.
 */
export default function webpackConfigs(configs = {}) {
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
