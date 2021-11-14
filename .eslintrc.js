'use strict'

module.exports = {
  extends: ['eloquence/node'],
  plugins: ['cypress'],

  rules: {
    // Package linting overrides
    'node/no-process-env': 'off',
    'node/no-sync': 'off',

    // CommonJS rule overrides
    'import/extensions': 'off',
    'import/no-useless-path-segments': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },

  overrides: [
    {
      files: ['cypress/tests/app.spec.js', 'cypress/support/index.js'],
      env: { 'cypress/globals': true },
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
}
