export function fillEmail(email) {
  cy.getByTestId('email').clear().type(email)
}

export function fillPassword(password) {
  cy.getByTestId('senha').clear().type(password)
}

export function clickLogin() {
  cy.getByTestId('entrar').click()
}

export function login(email, password) {
  fillEmail(email)
  fillPassword(password)
  clickLogin()
}

export function shouldSeeError(message) {
  cy.get('.alert')
    .should('be.visible')
    .and('contain.text', message)
}