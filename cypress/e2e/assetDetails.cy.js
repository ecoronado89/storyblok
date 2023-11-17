import Login from "../pageObjects/login";
import HomePage from "../pageObjects/homepage";
import Assets from "../pageObjects/assets";

describe("Assets", () => {
  const login = new Login();
  const homePage = new HomePage();
  const assets = new Assets();
  let assetId = [];

  beforeEach(() => {
    cy.visit("/");
    login.signIn(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
    homePage.getMySpace().click();
    homePage.getAssets().click();
  });


  it("Asset name should be mandatory", () => {
    cy.uploadFile("adobe-reader.png");
    assets.getNameInput().clear();
    assets.getUploadBtn().should("have.attr", "disabled");
  });

  it("Past expiration date should throw error", () => {
    cy.uploadFile("adobe-reader.png");
    assets.getAdvancedOptions().click({ force: true });
    assets.getFormPrivateBtn().click({ force: true });
    assets.getPublishPrivateAssetInput().type("2020-11-17 23:59");
    assets.getUploadBtn().click();
    assets.getNotificationError().should("be.visible");
    assets
      .getNotificationErrorMsg()
      .should("have.text", "Please select a future date");
  });
});