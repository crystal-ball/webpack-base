module.exports = {
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            // Disable module transformation to allow webpack to manage it
            modules: false,
            targets: {
              chrome: '70',
              firefox: '63',
            },
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
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            // Disable module transformation to allow webpack to manage it
            modules: false,
            targets: '> 0.25%, not ie 11, not dead',
            // Will automatically add core-js imports for unsupported language
            // features based on environment
            useBuiltIns: 'usage',
            corejs: { version: 3, proposals: true },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        // Runtime will transform Babel helpers to imports from @babel/runtime
        // Passing useESModules allows webpack to handle module transforms
        ['@babel/plugin-transform-runtime', { useESModules: true }],
      ],
    },
  },
}
