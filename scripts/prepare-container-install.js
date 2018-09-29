const { writeFileSync } = require('fs')
const { resolve } = require('path')

/* eslint-disable import/no-unresolved */
const sourcePackage = require('../source.package.json')
const projectPackage = require('../package.json')

delete projectPackage.devDependencies['@crystal-ball/webpack-base']

projectPackage.devDependencies = {
  ...projectPackage.devDependencies,
  ...sourcePackage.dependencies,
}

writeFileSync(resolve('package.json'), JSON.stringify(projectPackage, null, 2))
