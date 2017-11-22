# webpack Configuration
webpack handles managing all of your project assets through the project source code
using loaders. Any images, styles, raw file content, etc. can be directly imported
into project JS code. This allows powerful transformations and explicit declaration
of what assets are used in a project.

## Analyzing Bundle Output

Build statistics are automatically captured using [Webpack Monitor][]. The plugin
provides interactive analysis of builds and build changes over time.

<!-- Links -->
[Webpack Monitor]: https://github.com/webpackmonitor/webpackmonitor

<!--
- webpack (webpack.config.js)
  - Copy (/public index.html, favicon.ico)
  - Output (/build)


* An exported function will be called with an env defined with the `--env` option:
 * ```sh
 * webpack --env=production
 * ```


* The returned configuration object has the following shape:
 * ```json
 * {
 *   entry: {},
 *   output: {},
 *   devtool: '',
 *   resolve: {},
 *   module: {
 *     rules: []
 *   },
 *   plugins: [],
 *   // Production env only
 *   bail: true,
 *   performance: {},
 *   // Development env only
 *   devServer: {}
 * }
 * ```
-->
