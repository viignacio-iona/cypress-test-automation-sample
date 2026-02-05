describe('Signup tests', () => {
  describe('Signup tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
    
  // - Signup modal opens correctly
  it('should open the signup modal', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#signInModal"]').click();
    });

    cy.get('#signInModal').should('be.visible').contains('Sign up');
  });

  // - Valid signup with new username and password
  it('should signup with new username and password', () => {
    const randomEmail = Cypress.generateRandomEmail();

    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('alertStub');
    });

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#signInModal"]').click();
    });

    cy.get('#signInModal').within(() => {
      cy.get('#sign-username').clear().invoke('val', randomEmail);
      cy.get('#sign-password').clear().invoke('val', 'test');
      cy.contains('button', 'Sign up').click();
    });

    cy.get('@alertStub').should('have.been.calledWith', 'Sign up successful.');
  });

  // - Username already exists validation
  // - Empty username field validation
  // - Empty password field validation
  // - Both fields empty validation
  // - Password requirements (if applicable)
  // - Successful signup creates account
  // - Signup modal closes correctly
  });
});