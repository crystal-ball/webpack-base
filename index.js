/* eslint-disable no-console */

'use strict';

const merge = require('webpack-merge');
const configurePaths = require('./lib/paths');
const development = require('./lib/development');
const production = require('./lib/production');
let common = require('./lib/common');

/**
 * Package generates webpack configs in this order:
 * 1. Generate paths using env w/ defaults+configured paths
 * 2. Generate configs common to all environments using `common`
 * 3. Generate env specific configs by with `merge`
 *
 * Flow: `env => paths(env) + common(env) + (dev || prod)`
 * @method index
 * @export
 * @param {string} env Environment to generate configs for, should be `development`
 *                     or `production`
 * @param {Object} options Available config generation options
 * @param {Object} options.paths Configurable paths that will override default paths
 * @return {Object} Complete webpack configuration for passed environment
 */
module.exports = (env, { paths } = {}) => {
  if (!env) {
    console.error('Env is required! Please use pass an env using: --env=ENV');
  }
  console.info(`Webpack running for ${env}`);

  // Ensure that Babel has an env for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || env;

  // Resolve paths config for env and passed paths
  const resolvedPaths = configurePaths(env, paths);

  // Generate common configs for all envs
  common = common(resolvedPaths);

  // Use webpack-merge and dev vs prod specific configs to return complete webpack
  // configuration object
  if (env === 'production') {
    return merge(common, production(resolvedPaths));
  }

  return merge(common, development(resolvedPaths));
};
