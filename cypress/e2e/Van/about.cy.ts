describe('About modal e2e tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  // - About modal/page opens correctly
  it('should open the about modal', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#videoModal"]').click();
    });

    cy.get('#videoModal').contains('About us');
  });

  // - About content is displayed
  it('should display the about content', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#videoModal"]').click();
    });

    cy.get('#videoModal').within(() => {
      cy.get('#example-video').should('be.visible');
      cy.get('button[title="Play Video"]').should('be.visible');
    });
  });

  // - About video can be played and paused
  it.only('should play the about video', () => {
    cy.get('#narvbarx').within(() => {
      cy.get('[data-target="#videoModal"]').click();
    });

    cy.get('#videoModal').within(() => {
      cy.get('button[title="Play Video"]').click();
      cy.get('#example-video').should('have.class', 'vjs-playing');

      cy.get('button[title="Pause"]').click();
      cy.get('#example-video').should('have.class', 'vjs-paused');
    });
  });
});
