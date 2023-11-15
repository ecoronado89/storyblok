// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import 'cypress-file-upload'

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://app.storyblok.com/')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('[data-testid="submit"]').click()
    cy.url().should('contain', '/spaces')
})

Cypress.Commands.add('uploadFile', () => {
    cy.get('#file').attachFile('frodo.jpeg')
    cy.wait(5000)
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })