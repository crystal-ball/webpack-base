context('Application build', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Startup', () => {
    it('should load successfully', () => {
      cy.get('h1')
        .contains('webpack-base')
        .should('exist')
    })
  })

  describe('Assets are hashed', () => {
    it('should hash image assets', () => {
      // https://on.cypress.io/should
      cy.get('img')
        .should('have.attr', 'src')
        .and('match', /\/static\/media\/karly-santiago\.[a-z0-9]+?\.jpg/)
    })
  })
})
