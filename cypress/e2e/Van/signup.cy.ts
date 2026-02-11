  describe('Signup flow e2e tests', () => {
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
  it('should show a browser prompt when the username already exists', () => {
    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('alertStub');
    });

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#signInModal"]').click();
    });

    cy.get('#signInModal').within(() => {
      cy.get('#sign-username').clear().invoke('val', 'test@test.com');
      cy.get('#sign-password').clear().invoke('val', 'test');
      cy.contains('button', 'Sign up').click();
    });

    cy.get('@alertStub').should('have.been.calledWith', 'This user already exist.');
  });

  // - Empty username field validation
  it('should show a browser prompt when the username is empty', () => {
    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('alertStub');
    });

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#signInModal"]').click();
    });

    cy.get('#signInModal').within(() => {
      cy.get('#sign-username').clear().invoke('val', '');
      cy.get('#sign-password').clear().invoke('val', 'test');
      cy.contains('button', 'Sign up').click();
    });

    cy.get('@alertStub').should('have.been.calledWith', 'Please fill out Username and Password.');
  });
  
  // - Empty password field validation
  it('should show a browser prompt when the password is empty', () => {
    const randomEmail = Cypress.generateRandomEmail();

    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('alertStub');
    });

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#signInModal"]').click();
    });

    cy.get('#signInModal').within(() => {
      cy.get('#sign-username').clear().invoke('val', randomEmail);
      cy.get('#sign-password').clear().invoke('val', '');
      cy.contains('button', 'Sign up').click();
    });

    cy.get('@alertStub').should('have.been.calledWith', 'Please fill out Username and Password.');
  });

  // - Both fields empty validation
  it('should show a browser prompt when both fields are empty', () => {
    const randomEmail = Cypress.generateRandomEmail();

    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('alertStub');
    });

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#signInModal"]').click();
    });

    cy.get('#signInModal').within(() => {
      cy.get('#sign-username').clear().invoke('val', '');
      cy.get('#sign-password').clear().invoke('val', '');
      cy.contains('button', 'Sign up').click();
    });

    cy.get('@alertStub').should('have.been.calledWith', 'Please fill out Username and Password.');
  });

  // - Successful signup creates account  
  it('should create an account after successful signup', () => {
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

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#logInModal"]').click();
    });

    cy.get('#logInModal').within(() => {
      cy.get('#loginusername').clear().invoke('val', randomEmail);
      cy.get('#loginpassword').clear().invoke('val', 'test');
      cy.contains('button', 'Log in').click();
    });

    cy.get('#narvbarx').within(() => {
      cy.get('#nameofuser').contains(randomEmail);
    });
  });

  // - Signup modal closes correctly
  it('should open and close the login modal', () => {
    // Via x button
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#signInModal"]').click();
    });

    cy.get('#signInModal')
      .should('be.visible')
      .should('have.attr', 'tabindex', '-1')
      .and('have.focus');

    cy.get('#signInModal')
      .find('button[aria-label="Close"]')
      .click();

    cy.get('#signInModal').should('not.be.visible');

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
});