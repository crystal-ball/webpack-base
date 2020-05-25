'use strict'

const { writeFileSync } = require('fs')
const { resolve } = require('path')

/* eslint-disable import/no-unresolved, node/no-missing-require -- File is created by Docker Compose */
const sourcePackage = require('../source.package.json')
const projectPackage = require('../package.json')

delete projectPackage.devDependencies['@crystal-ball/webpack-base']
delete sourcePackage.devDependencies.cypress // don't need this in container

projectPackage.devDependencies = {
  ...projectPackage.devDependencies,
  ...sourcePackage.dependencies,
}

writeFileSync(resolve('package.json'), JSON.stringify(projectPackage, null, 2))
