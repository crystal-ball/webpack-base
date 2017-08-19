/* eslint-disable no-undef */
/** Supported environment values */
export type Envs = 'development' | 'production'

/** Configuration options for customizing returned configuration */
export interface Settings {
  /** Environment value for required build configurations */
  env: Envs
  paths?: Paths
}

/** Path configurations passed to constructed Webpack configs object. */
export interface Paths {
  /** Entry points into application _(`react-hot-loader` automatically included in
   * development)_ */
  appEntry?: string[]
  /** File path to application index entry point */
  appIndexJs?: string
  /** File path to application `package.json` */
  appPackageJson?: string
  /** Directory path to application public static assets */
  appPublic?: string
  /** Directory path to application source files */
  appSrc?: string
  /** Directory paths to use TS+Babel loaders with. */
  babelLoaderInclude?: string[]
  /** File path to `index.html` template file path _(Passed to `HtmlWebpackPlugin`)_
   * */
  htmlTemplate?: string
  /** Directory path to application `node_modules` */
  nodeModules?: string
  /** Name used for bundle output file */
  outputFilename?: string
  /** Directory path used for bundle output target */
  outputPath?: string
  /** Prefix appended to all emitted assets, can be used with a CDN or server
   * subdirectory */
  publicPath?: string
  /** File path to application `yarn.lock` */
  yarnLockFile?: string
}
