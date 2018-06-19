#! /usr/bin/env node
const shell = require('shelljs')
const { resolve } = require('path')

/**
 * Copy the Babel and webpack configurations into the new project
 */

const cwd = process.cwd()

// Copy template project
shell.cp(resolve(__dirname, 'config-files/.babelrc'), cwd)
shell.cp(resolve(__dirname, 'config-files/.eslintrc.js'), cwd)
shell.cp(resolve(__dirname, 'config-files/webpack.config.js'), cwd)

shell.mkdir(resolve(cwd, 'public'))
shell.cp(resolve(__dirname, 'config-files/favicon.ico'), cwd)

console.log('Configurations generated!') // eslint-disable-line
