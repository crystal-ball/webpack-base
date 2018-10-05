module.exports = {
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              Chrome: '65',
              Firefox: '60',
            },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime', // Needed for generators and babel-helpers
      ],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: { browsers: ['>0.25%', 'not ie 11', 'not op_mini all'] },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime', // Needed for generators and babel-helpers
      ],
    },
  },
}
