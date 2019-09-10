#!/bin/bash

# This post install script will install Cypress after local installs but not
# in CI/CD environments where Cypress will be run using a Docker image (This
# helps speed up CI/CD builds by only installing Cypress where necessary).

# Skip install in continous integration envs
[[ ! -z "$CI" ]] && exit 0

# When package is installed as a node_module, do nothing
[[ "$PWD" == *node_modules* ]] && exit 0

# NPM install was run in local project repo, install Cypress for local testing √
echo Installing Cypress...
npm install cypress@3.4.1 --no-save