'use strict'

module.exports = {
  root: true,
  extends: 'eloquence/node',

  overrides: [
    {
      files: ['cypress/**'],
      plugins: ['cypress'],
      env: {
        'cypress/globals': true,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
}
