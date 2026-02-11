describe('Contact flow e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // - Contact modal/page opens correctly
  it('should open the contact modal', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#exampleModal"]').click();
    });

    cy.get('#exampleModal').should('be.visible').contains('New message');
  });

  // - All form fields are present (email, name, message)
  it('should have all form fields present', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#exampleModal"]').click();
    });

    cy.get('#exampleModal').within(() => {
      cy.get('#recipient-email')
        .should('be.visible')
        .then((email) => {
          cy.get('label[for="recipient-name"]').contains('Contact Email').should('be.visible');
        });

      cy.get('#recipient-name')
        .should('be.visible')
        .then((name) => {
          cy.get('label[for="recipient-name"]').contains('Contact Name').should('be.visible');
        });

      cy.get('#message-text')
        .should('be.visible')
        .then((message) => {
          cy.get('label[for="message-text"]').contains('Message').should('be.visible');
        });
    });
  });
  
  // - Valid form submission
  it('should submit the form successfully', () => {
    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('alertStub');
    });

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#exampleModal"]').click();
    });

    cy.get('#exampleModal').within(() => {
      cy.get('#recipient-email').clear().invoke('val', 'test@test.com');
      cy.get('#recipient-name').clear().invoke('val', 'Test Name');
      cy.get('#message-text').clear().invoke('val', 'Test Message');
      cy.contains('button', 'Send message').click();
    });

    cy.get('@alertStub').should('have.been.calledWith', 'Thanks for the message!!');
  });

  // - Form closes after submission
  it('should close the form after submission', () => {
    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('alertStub');
    });

    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#exampleModal"]').click();
    });

    cy.get('#exampleModal').within(() => {
      cy.get('#recipient-email').clear().invoke('val', 'test@test.com');
      cy.get('#recipient-name').clear().invoke('val', 'Test Name');
      cy.get('#message-text').clear().invoke('val', 'Test Message');
      cy.contains('button', 'Send message').click();
    });

    cy.get('@alertStub').should('have.been.calledWith', 'Thanks for the message!!');

    cy.get('#exampleModal').should('not.be.visible');
  });

  // - Form can be closed without submitting
  it('should close the form without submitting', () => {
    // Via x button
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#exampleModal"]').click();
    });

    cy.get('#exampleModal')
      .should('be.visible')
      .should('have.attr', 'tabindex', '-1')
      .and('have.focus');

    cy.get('#exampleModal').within(() => {
      cy.get('button[aria-label="Close"]').click();
    });

    cy.get('#exampleModal').should('not.be.visible');

    // Via Close button
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#exampleModal"]').click();
    });

    cy.get('#exampleModal')
      .should('be.visible')
      .should('have.attr', 'tabindex', '-1')
      .and('have.focus');

    cy.get('#exampleModal').within(() => {
      cy.contains('button', 'Close').click();
    });

    cy.get('#exampleModal').should('not.be.visible');
  });
});
