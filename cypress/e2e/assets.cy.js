import Login from "../pageObjects/login";
import HomePage from "../pageObjects/homepage";
import Assets from "../pageObjects/assets";

describe("Assets", () => {
  const login = new Login();
  const homePage = new HomePage();
  const assets = new Assets();

  beforeEach(() => {
    cy.visit("/");
    login.signIn("coreddin@gmail.com", "@Hangar18001");
    homePage.getMySpace().click();
    homePage.getAssets().click();
  });

  it("File upload", () => {
    let fileName = Math.round(Math.random() * 1000)
    cy.uploadFile("frodo.jpeg");
    assets.getNameInput().clear().type(fileName);
    assets.getUploadBtn().click();
    assets.getFileContainer().should("be.visible");
    assets.getFileName().should("have.text", fileName);
  });

  it("Private file", () => {
    cy.uploadFile("frodo.jpeg");
    assets.getPrivateBtn().click();
    assets.getUploadBtn().click();
    assets.getPrivateFileContainer().should("be.visible");
  });
});
