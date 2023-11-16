import Login from "../pageObjects/login";
import HomePage from "../pageObjects/homepage";
import Assets from "../pageObjects/assets";

describe("Replace", () => {
  const login = new Login();
  const homePage = new HomePage();
  const assets = new Assets();
  let assetId = []

  beforeEach(() => {
    cy.intercept("POST", "**/assets").as("upload");
    cy.visit("/");
    login.signIn(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
    homePage.getMySpace().click();
    homePage.getAssets().click();
    cy.uploadFile("frodo.jpeg");
    assets.getUploadBtn().click();
    cy.wait("@upload").then(({ response }) => {
      assetId.push(response.body.id);
    });
  });

  after(() => {
    cy.removeFile(assetId);
  });

  it("Replace file", () => {
    cy.intercept("POST", "**/assets").as("replaceFile");
    assets.getDotMenu().click({ force: true });
    assets.getDotMenuOption('Replace').click({ force: true })
    cy.replaceFile("saruman.jpeg");
    cy.wait("@replaceFile")
      .its("response")
      .then((response) => {
        cy.wrap(response).its("statusCode").should("eq", 200);
        cy.wrap(response).its("body.id").should("eq", assetId[0]);
      });
  });
});
