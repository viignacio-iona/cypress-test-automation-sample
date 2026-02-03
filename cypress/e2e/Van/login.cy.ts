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
  
    cy.get('@alertStub').should('have.been.calledWith', 'Wrong password.');
  });

  // - Empty username field
  it('should show a browser prompt when the username is empty', () => {
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
          .invoke('val', '')
          .trigger('input');
          
        cy.get('#loginpassword')
          .clear()
          .invoke('val', 'testincorrect')
          .trigger('input');
          
        cy.contains('button', 'Log in').click();
      });
  
    cy.get('@alertStub').should('have.been.calledWith', 'Please fill out Username and Password.');
  });
  
  // - Empty password field
  it('should show a browser prompt when the password is empty', () => {
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
          .invoke('val', '')
          .trigger('input');
          
        cy.contains('button', 'Log in').click();
      });
  
    cy.get('@alertStub').should('have.been.calledWith', 'Please fill out Username and Password.');
  });
  
  // - Both fields empty
  it('should show a browser prompt when both fields are empty', () => {
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
          .invoke('val', '')
          .trigger('input');
          
        cy.get('#loginpassword')
          .clear()
          .invoke('val', '')
          .trigger('input');
          
        cy.contains('button', 'Log in').click();
      });
  
    cy.get('@alertStub').should('have.been.calledWith', 'Please fill out Username and Password.');
  });
  
  // - Login modal opens and closes correctly
  it('should open and close the login modal', () => {
    // Via x button
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#logInModal"]').click();
    });

    cy.get('#logInModal')
      .should('be.visible')
      .should('have.attr', 'tabindex', '-1')
      .and('have.focus');

    cy.get('#logInModal')
      .find('button.close')
      .click();

    cy.get('#logInModal').should('not.be.visible');

    // Via Close button
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#logInModal"]').click();
    });

    cy.get('#logInModal')
      .should('be.visible')
      .should('have.attr', 'tabindex', '-1')
      .and('have.focus');

    cy.get('#logInModal')
      .find('button').contains('Close')
      .click();

    cy.get('#logInModal').should('not.be.visible');
  });

  // - Successful login redirects appropriately
  it('should redirect to the home page after successful login', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#logInModal"]').click();
    });

    cy.get('#logInModal').within(() => {
      cy.get('#loginusername').clear().invoke('val', 'test@test.com');
      cy.get('#loginpassword').clear().invoke('val', 'test');
      cy.contains('button', 'Log in').click();
    });

    cy.get('#narvbarx').within(() => {
      cy.get('#nameofuser').contains('test@test.com').click();
    });

    cy.url().should('include', '/#');
  });
  });
});
