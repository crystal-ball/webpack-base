'use strict'

module.exports = {
  root: true,
  extends: '@crystal-ball/eloquence',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs']
      }
    }
  },
  rules: {
    'import/extensions': ['error', 'always', { js: 'never', mjs: 'never' }]
  }
}
