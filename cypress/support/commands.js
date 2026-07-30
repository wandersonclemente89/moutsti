// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('getByTestId', (selector) => {
  return cy.get(`[data-testid="${selector}"]`)
})

Cypress.Commands.add('loginByApi', (credentials = {}, options = {}) => {
  const body = {
    email: credentials.email || cy.config('userEmail'),
    password: credentials.password || cy.config('userPassword')
  }

  return cy.request({
    method: 'POST',
    url: `${cy.config('apiUrl')}/login`,
    body,
    ...options
  })
})
