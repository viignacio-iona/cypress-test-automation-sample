describe('DemoBlaze Homepage', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    // Verify the page title
    cy.title().should('include', 'STORE');

    // Verify main navigation elements are visible
    cy.get('a').contains('Home').should('be.visible');
    cy.get('a').contains('Contact').should('be.visible');
    cy.get('a').contains('About us').should('be.visible');
    cy.get('a').contains('Cart').should('be.visible');
  });

  it('should display product categories', () => {
    // Verify categories section exists
    cy.contains('CATEGORIES').should('be.visible');
    
    // Verify category links are present
    cy.contains('Phones').should('be.visible');
    cy.contains('Laptops').should('be.visible');
    cy.contains('Monitors').should('be.visible');
  });

  it('should have working navigation links', () => {
    // Test navigation to Contact page
    cy.get('a').contains('Contact').click();
    
    // Verify contact modal or page loads
    cy.contains('Contact Email').should('be.visible');
  });
});
