import 'cypress-file-upload'

Cypress.Commands.add('uploadFile', (fileName) => {
    cy.get('#file').attachFile(fileName)
})

Cypress.Commands.add('replaceFile', (replaceFile) => {
    cy.get('#replacefile').attachFile(replaceFile)
})

Cypress.Commands.add('removeFile', (fileId) => {
    cy.request({
        method: 'POST',
        url: `https://app.storyblok.com/v1/spaces/${Cypress.env("SPACE_ID")}/assets/bulk_destroy`,
        headers: {
            Authorization: Cypress.env("API_TOKEN")
        },
        body: {
            "ids":fileId
        }
    })
})
