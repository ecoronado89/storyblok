import Login from "../pageObjects/login";
import HomePage from "../pageObjects/homepage";
import Assets from "../pageObjects/assets";

describe("Assets", () => {
  const login = new Login();
  const homePage = new HomePage();
  const assets = new Assets();
  let assetId = [];

  beforeEach(() => {
    cy.intercept("POST", "**/assets").as("public");
    cy.visit("/");
    login.signIn("coreddin@gmail.com", "@Hangar18001");
    homePage.getMySpace().click();
    homePage.getAssets().click();
  });

  after(() => {
    cy.removeFile(assetId);
  });

  it("File upload", () => {
    let fileName = Math.round(Math.random() * 1000)
    cy.uploadFile("frodo.jpeg");
    assets.getNameInput().clear().type(fileName);
    assets.getUploadBtn().click();
    cy.wait("@public").then(({ response }) => {
      assetId.push(response.body.id);
    });
    assets.getFileContainer().should("be.visible");
    assets.getFileName().should("have.text", fileName);
  });

  it("Private file", () => {
    cy.intercept("POST", "**/assets").as("private");
    cy.uploadFile("frodo.jpeg");
    assets.getPrivateBtn().click();
    assets.getUploadBtn().click();
    cy.wait("@private").then(({ response }) => {
      assetId.push(response.body.id);
    });
    assets.getPrivateFileContainer().should("be.visible");
  });
});
