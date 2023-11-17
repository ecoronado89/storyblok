class Assets {
  getNameInput() {
    return cy.get("#asset-name-input-0");
  }

  getUploadBtn() {
    return cy.get("[type=submit]");
  }

  getVisibilityAsset() {
    return cy.get(".assets-upload-item__edit");
  }

  getAdvancedOptions() {
    return cy.get(".assets-upload-item__more-options-button");
  }

  getPublishPrivateAssetInput() {
    return cy.get('[placeholder="Select date"]');
  }

  getFormPrivateBtn() {
    return cy.get("#asset-form-overview-private-asset");
  }

  getNotificationError() {
    return cy.get(".error");
  }

  getNotificationErrorMsg() {
    return cy.get(".custom-notification__text");
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

  getDotMenu() {
    return cy.get('[aria-label="Asset actions"]');
  }

  getDotMenuOption(option) {
    return cy.contains('[role="menuitemradio"]', option);
  }

  getAssetPreview() {
    return cy.get(".asset-detail-preview__visibility");
  }
}
export default Assets;
