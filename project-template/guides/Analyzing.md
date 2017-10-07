## Analyzing Bundle Output

#### Webpack Visualizer
The Webpack configs include the `webpack-visualizer-plugin` which will output a
dependencies graph to `/dist/stats.html` for production builds. This can be used to
analyze what the bundle is composed of.

#### Additional Tools
Other visualizers/tools can be used with the bundle stats by generating a stats JSON
file. The `profile` and `json` flags must be passed to the Webpack call and the
results piped to a file:

`NODE_ENV=production webpack --env=production --profile --json > webpack-stats.json`

Visualization Tools:
- [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)
- [Webpack Bundle Analyzer](webpack-bundle-analyzer)
