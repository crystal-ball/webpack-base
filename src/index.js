/* eslint-disable no-param-reassign */
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
module.exports = function webpackBase(options = {}) {
  process.argv.forEach(arg => {
    const match = arg.match(/(mode)/)
    // Fallback to true for flags without value, eg --docker
    /* eslint-disable prefer-destructuring */
    if (match) options[match[1]] = arg.split('=')[1] || true
    /* eslint-enable prefer-destructuring */
  })

  // Ensure that Babel has the correct environment variable for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || options.mode

  const configs = generateConfigs(options)

  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  return options.mode === 'production'
    ? merge(common(configs), production(configs))
    : merge(common(configs), development(configs))
}
