class Assets {
  getNameInput() {
    return cy.get("#asset-name-input-0");
  }

  getUploadBtn() {
    return cy.get("[type=submit]");
  }

  getFileContainer() {
    return cy.get(".assets-list-item__container");
  }

  getFileName() {
    return cy.get('[data-testid="asset-name"]');
  }

  getPrivateBtn() {
    return cy.get(".sb-toggle");
  }

  getPrivateFileContainer() {
    return cy.get(".asset-private-preview");
  }
}
export default Assets;
