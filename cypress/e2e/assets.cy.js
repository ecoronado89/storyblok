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

  afterEach(() => {
    cy.removeFile(assetId);
  });

  it("Asset upload", () => {
    let fileName = Math.round(Math.random() * 1000);
    cy.intercept("POST", "**/assets").as("public");
    cy.uploadFile("adobe-reader.png");
    assets.getNameInput().clear().type(fileName);
    assets.getUploadBtn().click();
    cy.wait("@public").then(({ response }) => {
      assetId.push(response.body.id);
    });
    assets.getFileContainer().should("be.visible");
    assets.getFileName().should("have.text", fileName);
  });

  it("Private asset", () => {
    cy.intercept("POST", "**/assets").as("private");
    cy.uploadFile("gmail.png");
    assets.getPrivateBtn().click();
    assets.getUploadBtn().click();
    cy.wait("@private").then(({ response }) => {
      assetId.push(response.body.id);
    });
    assets.getPrivateFileContainer().should("be.visible");
  });

  it("View details - Private asset", () => {
    cy.intercept("POST", "**/assets").as("preview");
    cy.uploadFile("adminer.svg");
    assets.getPrivateBtn().click();
    assets.getUploadBtn().click();
    cy.wait("@preview").then(({ response }) => {
      assetId.push(response.body.id);
    });
    assets.getDotMenuOption("View Details").click({ force: true });
    assets
      .getAssetPreview()
      .should(
        "have.text",
        "Private AssetNot available to the public and can only be accessed via an access token."
      );
  });

  // it("Asset name should be mandatory", () => {
  //   cy.uploadFile("adobe-reader.png");
  //   assets.getNameInput().clear();
  //   assets.getUploadBtn().should("have.attr", "disabled");
  // });

  // it("Past expiration date", () => {
  //   cy.uploadFile("adobe-reader.png");
  //   assets.getAdvancedOptions().click({ force: true });
  //   assets.getFormPrivateBtn().click({ force: true });
  //   assets.getPublishPrivateAssetInput().type("2020-11-17 23:59");
  //   assets.getUploadBtn().click();
  //   assets.getNotificationError().should("be.visible");
  //   assets
  //     .getNotificationErrorMsg()
  //     .should("have.text", "Please select a future date");
  // });
});
