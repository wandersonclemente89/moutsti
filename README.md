# MoutsTI - Automated Tests (Cypress)

Automated test suite (API and UI) for the [ServeRest](https://serverest.dev) application, using [Cypress](https://www.cypress.io/) 15.

## Requirements

- **Node.js 20.x, 22.x, or >=24.x** (Cypress 15 dropped support for Node 18 and 23 — Node 22 LTS is recommended)
- **npm >=10.1.0** (installed together with Node.js)
- OS: macOS 13.5+, Windows 10/11, or Linux (Ubuntu 22.04+ / Debian 11+)

> Check your version with `node -v`. If you're on Node 18, upgrade before installing dependencies — `npm install` will fail otherwise.

## Installation

```bash
npm install
```

## Running the tests

Open Cypress in interactive mode (recommended during development):

```bash
npx cypress open
```

Run all tests headlessly (terminal only, no UI):

```bash
npx cypress run
```

Run only the API or UI tests:

```bash
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
npx cypress run --spec "cypress/e2e/ui/**/*.cy.js"
```

## Configuration

Test URLs are defined in [cypress.config.js](cypress.config.js):

- `baseUrl`: `https://front.serverest.dev` (used by UI tests)
- `apiUrl`: `https://serverest.dev` (used by API tests)

## Project structure

```
cypress/
├── e2e/
│   ├── api/        # API tests (login, users, products)
│   └── ui/         # UI tests
├── support/
│   ├── actions/    # reusable UI actions
│   ├── api/        # reusable API calls
│   └── commands.js
└── fixtures/       # test data (user.json, product.json)
```
