# Test Automation Tutorial

Welcome to the Test Automation Tutorial repository! This repository is designed to help QA team members learn test automation using Cypress and TypeScript.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: Version 24.x LTS or higher (latest: 24.13.0)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm**: Comes with Node.js (version 10.0.0 or higher)
  - Verify installation: `npm --version`
- **Git**: For version control
  - Verify installation: `git --version`
- **Basic understanding of TypeScript**: Optional, but helpful for better IDE support and type safety

## Getting Started

### 1. Download/Clone Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd test-automation-tutorial
```

### 2. Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

This will install Cypress, TypeScript, and all other necessary packages.

### 3. Create Your Own Branch

**Important**: Always work on your own branch to avoid conflicts with other team members.

Create and switch to your own branch:

```bash
git checkout -b your-name/feature-description
```

**Alternative method** (if you prefer separate commands):

```bash
git branch your-name/feature-description
git checkout your-name/feature-description
```

**Branch Naming Convention**: Use your name followed by a brief description, for example:
- `van/login-tests`
- `john/cart-functionality`
- `sarah/product-search-tests`

### 4. Create Your Test Folder

For better test case management, each team member should create their own folder under `cypress/e2e/`:

1. Navigate to the `cypress/e2e/` directory
2. Create a folder with your name (e.g., `Van`, `John`, `Sarah`)
3. Place all your test files inside your personal folder

**Example structure:**
```
cypress/
  └── e2e/
      ├── Van/
      │   └── e2e.cy.ts
      ├── John/
      │   └── login.cy.ts
      └── Sarah/
          └── cart.cy.ts
```

**Folder Naming Convention**: Use your first name or preferred identifier (e.g., `Van`, `John`, `Sarah`)

### 5. Running Tests

Once everything is set up, you can run tests in different modes:

**Open Cypress Test Runner** (Interactive mode - recommended for learning):
```bash
npm run cy:open
```

**Run tests headlessly** (Command line mode):
```bash
npm run cy:run
```

**Run tests in headed mode** (Browser visible):
```bash
npm run cy:headed
```

## Working with Your Branch

### Committing Changes

After making changes to your test files, commit them to your branch:

```bash
# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Add login test for DemoBlaze"
```

**Commit Message Best Practices**:
- Use clear, descriptive messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep messages concise but informative

### Pushing to Your Branch

Push your changes to the remote repository:

```bash
git push origin your-branch-name
```

**Example:**
```bash
git push origin van/login-tests
```

### Creating a Pull Request

After pushing your changes, you can create a pull request on GitHub/GitLab to:
- Share your work with the team
- Get code reviews
- Merge your changes to the main branch (if approved)

## Test Website

This tutorial uses **[DemoBlaze](https://www.demoblaze.com/)** as the test application.

### About DemoBlaze

DemoBlaze is a demo e-commerce website designed for testing purposes. It includes:

- **Product Catalog**: Phones, Laptops, and Monitors
- **Shopping Cart**: Add/remove products
- **User Authentication**: Sign up and login functionality
- **Contact Form**: Submit messages
- **Product Details**: View individual product information

### What You Can Practice

- **Navigation Testing**: Test menu links and page navigation
- **Form Testing**: Test login, signup, and contact forms
- **Product Testing**: Browse products, view details, add to cart
- **Cart Functionality**: Add/remove items, checkout process
- **UI Element Verification**: Verify elements are visible, clickable, etc.
- **API Testing**: Test backend interactions (if applicable)

## Project Structure

```
test-automation-tutorial/
├── README.md                    # This file
├── package.json                 # Dependencies and npm scripts
├── tsconfig.json                # TypeScript configuration
├── .gitignore                   # Git ignore patterns
├── cypress.config.ts            # Cypress configuration
├── cypress/
│   ├── e2e/                     # End-to-end test files
│   │   ├── Van/                 # Team member folder (example)
│   │   │   └── e2e.cy.ts        # Example test file
│   │   └── [YourName]/          # Your folder goes here
│   ├── fixtures/                # Test data fixtures
│   │   └── example.json         # Example fixture data
│   ├── support/                 # Support files
│   │   ├── commands.ts          # Custom Cypress commands
│   │   └── e2e.ts               # Global test configuration
│   └── downloads/              # Downloaded files (gitignored)
```

## Writing Your First Test

Here's a simple example to get you started. Create a file in your folder (e.g., `cypress/e2e/YourName/my-first-test.cy.ts`):

```typescript
describe('My First Test', () => {
  it('should visit the homepage', () => {
    cy.visit('/');
    cy.title().should('include', 'STORE');
  });
});
```

### Key Cypress Commands

- `cy.visit(url)` - Navigate to a page
- `cy.get(selector)` - Find an element
- `cy.contains(text)` - Find element containing text
- `cy.click()` - Click an element
- `cy.type(text)` - Type into an input field
- `cy.should(assertion)` - Make an assertion
- `cy.fixture(file)` - Load test data from fixtures

## Best Practices

1. **Organize Your Tests**: Keep related tests in the same file
2. **Use Descriptive Names**: Test names should clearly describe what they test
3. **Keep Tests Independent**: Each test should be able to run on its own
4. **Use Fixtures**: Store test data in fixture files for reusability
5. **Follow Page Object Model**: Consider organizing selectors and actions (advanced)
6. **Write Clear Assertions**: Make sure your assertions are meaningful
7. **Commit Frequently**: Commit your work often with clear messages
8. **Stay in Your Branch**: Never commit directly to main/master branch

## Resources and Learning Materials

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [DemoBlaze Website](https://www.demoblaze.com/)

## Troubleshooting

### Cypress won't open
- Make sure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 24.x or higher)

### Tests are failing
- Verify the base URL in `cypress.config.ts`
- Check that DemoBlaze website is accessible
- Review test selectors - they may have changed

### TypeScript errors
- Ensure TypeScript is installed: `npm list typescript`
- Check `tsconfig.json` configuration
- Restart your IDE/editor

## Need Help?

If you encounter any issues or have questions:
1. Check the Cypress documentation
2. Review example tests in the `Van/` folder
3. Ask your team members
4. Check existing issues in the repository

---

Happy Testing! 🚀
