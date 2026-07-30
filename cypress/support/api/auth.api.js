export function login(credentials, options = {}) {
  return cy.request({
    method: 'POST',
    url: `${cy.config('apiUrl')}/login`,
    body: credentials,
    ...options
  })
}