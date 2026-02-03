describe('Login Flow', () => {
  // TODO: Add login test cases here
  describe('Login tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  // Test scenarios to implement:
  // - Valid login with correct credentials
  it('should login with correct credentials', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#logInModal"]').click();
    });

    cy.get('#logInModal').within(() => {
      cy.get('#loginusername').clear().invoke('val', 'test@test.com');
      cy.get('#loginpassword').clear().invoke('val', 'test');
      cy.contains('button', 'Log in').click();
    });

    cy.get('#narvbarx').within(() => {
      cy.get('#nameofuser').contains('test@test.com');
    });
  });
  // - Invalid username
  it('should show a browser prompt when the credentials are incorrect', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
  
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#logInModal"]').click();
    });
  
    cy.get('#logInModal')
      .should('be.visible')
      .within(() => {
        cy.get('#loginusername')
          .clear()
          .invoke('val', 'testuser')
          .trigger('input');
          
        cy.get('#loginpassword')
          .clear()
          .invoke('val', 'wrongpassword')
          .trigger('input');
          
        cy.contains('button', 'Log in').click();
      });
  
    // Verify alert was called with "Wrong password"
    cy.get('@alertStub').should('have.been.calledWith', 'Wrong password.');
  });
  // - Invalid password
  // - Empty username field
  // - Empty password field
  // - Both fields empty
  // - Login modal opens and closes correctly
  // - Successful login redirects appropriately
  });
});
