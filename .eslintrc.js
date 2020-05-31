'use strict'

const eloquence = require('eslint-config-eloquence')

const configs = eloquence({ target: 'node', esm: false })
configs.rules = {
  ...configs.rules,

  // Package linting overrides
  'node/no-process-env': 'off',
  'node/no-sync': 'off',
}
configs.overrides.push({
  files: ['cypress/integration/app.spec.js', 'cypress/support/index.js'],
  parserOptions: {
    sourceType: 'module',
  },
})

module.exports = configs
