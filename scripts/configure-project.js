#! /usr/bin/env node
const shell = require('shelljs')
const { resolve } = require('path')

/**
 * Copy the Babel and webpack configurations into the new project
 */

const cwd = process.cwd()

// Copy template project
shell.cp(resolve(__dirname, '../test-app', '.babelrc'), cwd)
shell.cp(resolve(__dirname, '../test-app', 'webpack.config.js'), cwd)

console.log('Configurations generated!') // eslint-disable-line
