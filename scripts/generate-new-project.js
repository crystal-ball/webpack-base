#! /usr/bin/env node
const shell = require('shelljs')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

const templatePackage = require('../test-app/package.json')

/**
 * Handle creating a new project from template
 */

const projectName = process.argv[2]

// Copy template project
shell.cp('-R', resolve(__dirname, '../test-app'), resolve(projectName))
// Copy guides from project root
shell.cp('-R', resolve(__dirname, '../guides'), resolve(projectName))

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

templatePackage.name = projectName
writeFileSync(
  resolve(projectName, 'package.json'),
  JSON.stringify(templatePackage, null, 2)
)

console.log('Project generated!')
