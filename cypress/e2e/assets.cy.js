describe('Assets', () => {

  beforeEach(() => {
    cy.login('coreddin@gmail.com', '@Hangar18001')
    cy.get('[data-testid="column-space-item"]').click()
    cy.get('#app-Assets').click()
  })

  it('File upload', () => {
    const dateNow = new Date()
    let fileName = dateNow.toISOString().toLowerCase()
    cy.uploadFile('frodo.jpeg')
    cy.get('#asset-name-input-0').clear()
    cy.get('#asset-name-input-0').type(fileName)
    cy.get('[type=submit]').click()
    cy.get('.assets-list-item__container').should('be.visible')
    cy.get('[data-testid="asset-name"]').should('have.text', fileName)
  })
})