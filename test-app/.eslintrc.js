'use strict'
process.env.ELOQUENCE_PROJECT_TYPE = 'webpack'

module.exports = {
  root: true,
  extends: 'eloquence',
  env: {
    browser: true,
  },
  rules: {
    // Disabled for test application only b/c of subdirectory resolving failures
    'import/extensions': 'off',
    'import/no-duplicates': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
  },
}
