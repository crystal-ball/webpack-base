#! /usr/bin/env node
const shell = require('shelljs')
const { writeFileSync } = require('fs')
const { resolve } = require('path')

const templatePackage = require('../project-template/package.json')

/**
 * Handle creating a new project from template
 */

const projectName = process.argv[2]

// Copy template project
shell.cp('-R', resolve(__dirname, '../project-template'), resolve(projectName))
// Copy guides from project root
shell.cp('-R', resolve(__dirname, '../guides'), resolve(projectName))

templatePackage.name = projectName
writeFileSync(
  resolve(projectName, 'package.json'),
  JSON.stringify(templatePackage, null, 2),
)

console.log('Project generated!')
