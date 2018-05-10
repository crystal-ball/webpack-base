'use strict'

module.exports = {
  root: true,
  extends: 'eloquence',
  env: {
    browser: true,
  },
  rules: {
    'import/extensions': 'off',
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
  },
}
