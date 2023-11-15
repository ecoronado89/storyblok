class Login {
  getEmail() {
    return cy.get("#email");
  }

  getPassword() {
    return cy.get("#password");
  }

  getSignInBtn() {
    return cy.get('[data-testid="submit"]');
  }

  signIn(email, password) {
    this.getEmail().type(email)
    this.getPassword().type(password)
    this.getSignInBtn().click()
    cy.url().should('contain', '/spaces')
  }
}
export default Login;
