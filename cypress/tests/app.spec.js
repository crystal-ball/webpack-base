/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */

describe('Application build', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  /**
   * The entire application should build and render without errors
   */
  it('should have built without errors', () => {
    cy.contains(/Prototype application/)
    cy.percySnapshot()
  })

  /**
   * Media imported through webpack should have cache busting hashes
   */
  it('should use hashed image assets', () => {
    cy.get('[data-testid=hero-img]').should(($img) => {
      expect($img.css('background-image')).to.match(
        /\/static\/media\/radpack-bg\.[a-z0-9]+\.jpg/,
      )
    })
  })
})
