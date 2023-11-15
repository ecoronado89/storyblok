describe('My First Test', () => {

  beforeEach(() => {
    cy.login('coreddin@gmail.com', '@Hangar18001')
    cy.get('[data-testid="column-space-item"]').click()
    cy.get('#app-Assets').click()
  })

  it('Does not do much!', () => {
    cy.uploadFile()
  })
})