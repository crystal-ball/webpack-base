describe('Application build', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Test that the production build finished without errors by loading the app
  it('should have built without errors', () => {
    cy.get('h1').contains(/The Order\s*of the\s*Crystal Code\s*Wizards/)
  })

  // Test that images loaded with the file loader are output into the correct
  // static/media folder and have a cache busting hash appended to the filename
  it('should hash image assets', () => {
    cy.get('img[alt="In pursuit of magic"]')
      .should('have.attr', 'src')
      .and('match', /\/static\/media\/karly-santiago\.[a-z0-9]+?\.jpg/)
  })
})
