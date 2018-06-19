#! /usr/bin/env node
const shell = require('shelljs')
const { writeFileSync } = require('fs')
const { join, resolve } = require('path')

const templatePackage = require('../test-app/package.json')

/**
 * Handle creating a new project from template
 * TODO: make this a flag --complete, and add a new default mode that only adds
 * necessary configs (.babelrc and webpack.config.js)
 */

/* eslint-disable import/no-dynamic-require */
const cwd = process.cwd()
const packageJSON = require(join(cwd, 'package.json'))
/* eslint-enable import/no-dynamic-require */
const projectName = packageJSON.name

// Copy template project
shell.cp('-R', resolve(__dirname, '../test-app'), cwd)

writeFileSync(
  resolve(projectName, '.gitignore'),
  `# Git Ignore (https://help.github.com/articles/ignoring-files/)

# Vendor
/node_modules

# Build
/build

# Dev
.DS_Store
npm-debug.log*
.vscode
`
)

packageJSON.scripts = Object.assign(templatePackage.scripts, packageJSON.scripts)
packageJSON.dependencies = Object.assign(
  templatePackage.dependencies,
  packageJSON.dependencies
)
packageJSON.devDependencies = Object.assign(
  templatePackage.devDependencies,
  packageJSON.devDependencies
)
writeFileSync(resolve(cwd, 'package.json'), JSON.stringify(packageJSON, null, 2))

console.log('Project generated!') // eslint-disable-line
