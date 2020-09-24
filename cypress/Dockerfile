# --- 🐳 Cypress CI Dockerfile ---
# Extend the cypress/included base image with tools used in addition to Cypress

FROM cypress/included:5.2.0

# Install any packages used in Cypress test files
RUN npm install @percy/cypress

# Reset the `cypress run` entrypoint set by the `cypress/included` image
ENTRYPOINT []
# Wrap Cypress call with Percy for snapshot testing
CMD [ "npx", "percy", "exec", "--", "cypress", "run"]
