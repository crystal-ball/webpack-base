'use strict';

module.exports = {
  root: true,
  extends: '@crystal-ball/eloquence',

  // Override for strict Node scripts
  parserOptions: {
    sourceType: 'script'
  },

  rules: {
    strict: [1, 'global']
  }
};
