FROM cypress/base:10
WORKDIR /usr/cypress

# Avoid many lines of progress bars during install with CI=true
# https://github.com/cypress-io/cypress/issues/1243
RUN CI=true npm install cypress

# Confirm the cypress install
RUN ./node_modules/.bin/cypress verify