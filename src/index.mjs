import merge from 'webpack-merge'

import common from './common'
import development from './development'
import production from './production'
import validatePaths from './validate-paths'

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
export default function webpackConfigs({
  env = 'development',
  paths: customPaths = {},
  port = 3000,
} = {}) {
  // Ensure that Babel has an environment variable for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || env

  // Resolve all configuration paths
  const paths = validatePaths({ env, customPaths })

  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  return env === 'production'
    ? merge(common(paths), production(paths))
    : merge(common(paths), development(paths, port))
}
