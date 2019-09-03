#!/bin/bash

# This post install script will install Cypress after local installs but not
# in CI/CD environments where Cypress is run using a Docker image. This helps
# speed up CI/CD builds by only installing Cypress where necessary.

# When package is installed as a node_module, do nothing
[[ "$PWD" == *node_modules* ]] exit 0

# Check for Travis env variable to determine CI/CD state
if [ -z "$TRAVIS_CI" ]; then
  echo Installing Cypress...
  npm install cypress@3.4.1 --no-save
fi