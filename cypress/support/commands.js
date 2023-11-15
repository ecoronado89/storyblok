import 'cypress-file-upload'

Cypress.Commands.add('uploadFile', (fileName) => {
    cy.get('#file').attachFile(fileName)
})
