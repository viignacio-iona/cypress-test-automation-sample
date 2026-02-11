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
  // - Password requirements (if applicable)
  // - Successful signup creates account
  // - Signup modal closes correctly
  });
});