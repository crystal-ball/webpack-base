'use strict'

process.env.ELOQUENCE_PROJECT_TYPE = 'webpack'
module.exports = {
  root: true,
  extends: 'eloquence',
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
