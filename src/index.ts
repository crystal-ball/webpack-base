import * as merge from 'webpack-merge'
import { Configuration } from 'webpack'

import configurePaths from './configure-paths'
import development from './development'
import production from './production'
import common from './common'
import { Settings } from './annotations'

/**
 * Package generates webpack configs in this order:
 * 1. Generate paths using env w/ defaults+configured paths
 * 2. Generate configs common to all environments using `common`
 * 3. Generate env specific configs by with `merge`
 *
 * Flow: `paths(env) => common(paths) + (dev(paths) || prod(paths))`
 */
export default function webpackConfigs(
  { env, paths }: Settings = { env: 'development' }
): Configuration {
  console.info(`Webpack running for ${env}`) // eslint-disable-line

  // Ensure that Babel has an env for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || env

  // Resolve paths config for env and passed paths
  const resolvedPaths = configurePaths({ env, paths })

  // Use webpack-merge and dev vs prod specific configs to return complete webpack
  // configuration object
  return env === 'production'
    ? merge(common(resolvedPaths), production(resolvedPaths))
    : merge(common(resolvedPaths), development(resolvedPaths))
}
