#! /usr/bin/env node
const shell = require('shelljs')
const { resolve } = require('path')
const { readFile, writeFile } = require('fs')

const templatePackage = require('../project-template/package.json')
const repoPackage = require('../package.json')

shell.cp(
  '-Ru',
  resolve(__dirname, '../project-template/__mocks__'),
  resolve(__dirname, '..'),
)
shell.cp(
  '-Ru',
  resolve(__dirname, '../project-template/flow-typed'),
  resolve(__dirname, '..'),
)
shell.cp(
  '-Ru',
  resolve(__dirname, '../project-template/public'),
  resolve(__dirname, '..'),
)
shell.cp(
  '-Ru',
  resolve(__dirname, '../project-template/src'),
  resolve(__dirname, '..'),
)

shell.cp(
  resolve(__dirname, '../project-template/.babelrc'),
  resolve(__dirname, '..'),
)
shell.cp(
  resolve(__dirname, '../project-template/.flowconfig'),
  resolve(__dirname, '..'),
)
shell.cp(
  resolve(__dirname, '../project-template/webpack.config.js'),
  resolve(__dirname, '..'),
)
shell.cp(
  resolve(__dirname, '../project-template/.eslintrc.js'),
  resolve(__dirname, '..'),
)

repoPackage.dependencies = Object.assign(
  repoPackage.dependencies,
  templatePackage.dependencies,
)

Object.keys(templatePackage.devDependencies).forEach(dep => {
  if (dep !== '@inspirescript/webpack-configs')
    repoPackage.devDependencies[dep] = templatePackage.devDependencies[dep]
})

writeFile(
  resolve(__dirname, '..', 'package.json'),
  JSON.stringify(repoPackage, null, 2),
  () => {},
)

// Update webpack.config.js to point to this repo
const webpackConfigPath = resolve('webpack.config.js')
readFile(webpackConfigPath, (err, data) => {
  if (err) return console.warn(err)

  let file = data.toString()
  file = file.replace('@inspirescript/webpack-configs', './index')

  return writeFile(webpackConfigPath, file, () => {})
})
