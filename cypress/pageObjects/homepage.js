class HomePage {
  getMySpace() {
    return cy.get('[data-testid="column-space-item"]');
  }

  getAssets() {
    return cy.get("#app-Assets");
  }
}

export default HomePage;
