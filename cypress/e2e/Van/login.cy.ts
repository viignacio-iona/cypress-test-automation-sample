describe('Login Flow', () => {
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
  it('should show a browser prompt when the username incorrect', () => {
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
          .invoke('val', 'testincorrect@test.com')
          .trigger('input');
          
        cy.get('#loginpassword')
          .clear()
          .invoke('val', 'test')
          .trigger('input');
          
        cy.contains('button', 'Log in').click();
      });
  
    // Verify alert was called with "Wrong password"
    cy.get('@alertStub').should('have.been.calledWith', 'User does not exist.');
  });
  // - Invalid password
  it('should show a browser prompt when the password is incorrect', () => {
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
          .invoke('val', 'test@test.com')
          .trigger('input');
          
        cy.get('#loginpassword')
          .clear()
          .invoke('val', 'testincorrect')
          .trigger('input');
          
        cy.contains('button', 'Log in').click();
      });
  
    // Verify alert was called with "Wrong password"
    cy.get('@alertStub').should('have.been.calledWith', 'Wrong password.');
  });
  // - Empty username field
  // - Empty password field
  // - Both fields empty
  // - Login modal opens and closes correctly
  // - Successful login redirects appropriately
  });
});
