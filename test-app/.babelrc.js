/**
 * CoreJS includes the polyfills for new language features compiled by Babel.
 * Explicitly set the `core-js` version used by `preset-env` per Babel best
 * practices and allow polyifilling proposal stage features
 */
const corejs = { version: 3, proposals: true }

module.exports = {
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            // Disable module transformation to allow webpack to manage it
            modules: false,
            targets: { chrome: '70', firefox: '63' },
            // Will automatically add core-js polyfill imports for unsupported
            // language features based on environment
            useBuiltIns: 'usage',
            // Set the core-js version as best practice and allow polyifilling
            // proposal stage features
            corejs,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-transform-react-jsx-source', // Better stacks for error boundaries
        'babel-plugin-styled-components', // Better styled component display names
        '@babel/plugin-proposal-class-properties',
        // Runtime will transform Babel helpers to imports from @babel/runtime
        // Passing useESModules allows webpack to handle module transforms
        ['@babel/plugin-transform-runtime', { useESModules: true, corejs }],
      ],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: '> 0.25%, not ie 11, not dead',
            useBuiltIns: 'usage',
            corejs,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        // Runtime will transform Babel helpers to imports from @babel/runtime
        // Passing useESModules allows webpack to handle module transforms
        ['@babel/plugin-transform-runtime', { useESModules: true, corejs }],
      ],
    },
  },
}
