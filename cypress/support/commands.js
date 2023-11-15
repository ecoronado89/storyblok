import 'cypress-file-upload'

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('[data-testid="submit"]').click()
    cy.url().should('contain', '/spaces')
})

Cypress.Commands.add('uploadFile', (fileName) => {
    cy.get('#file').attachFile(fileName)
})
