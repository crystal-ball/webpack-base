#!/bin/bash

# Script handles installing Cypress only on dev machines and not in the Travis
# CI builds, this speeds up CI a LOT not installing Travis
if [ -z "$TRAVIS_CI" ]; then
  echo Installing Cypress...
  npm install cypress@3.4.0 --no-save
fi