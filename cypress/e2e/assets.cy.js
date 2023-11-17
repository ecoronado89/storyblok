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

  it("Should upload public asset", () => {
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

  it("Should upload private asset", () => {
    cy.intercept("POST", "**/assets").as("private");
    cy.uploadFile("gmail.png");
    assets.getPrivateBtn().click();
    assets.getUploadBtn().click();
    cy.wait("@private").then(({ response }) => {
      assetId.push(response.body.id);
    });
    assets.getPrivateFileContainer().should("be.visible");
  });

  it("Should display private preview", () => {
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
});
