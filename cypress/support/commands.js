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
        url: 'https://app.storyblok.com/v1/spaces/262308/assets/bulk_destroy',
        headers: {
            Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMjAyMjEsInRpbWVzdGFtcCI6MTcwMDYyODQ0Mn0.-xDXspmzg3miNyu3kQaadlGzRYNi4IEu6vqfrfLjAbw'
        },
        body: {
            "ids":[fileId]
        }
    })
})
