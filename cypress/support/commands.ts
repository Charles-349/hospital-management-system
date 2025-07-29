/// <reference types="cypress" />
Cypress.Commands.add('getDataTest', (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`)
})


// login as a user
Cypress.Commands.add('loginAsUser', (email = 'darwincharles1110@gmail.com', password = '12345678') => {
  cy.visit('/login')
  cy.getDataTest('login-email-input').type(email)
  cy.getDataTest('login-password-input').type(password)
  cy.getDataTest('login-submit-button').click()
  cy.url().should('include', '/user/dashboard').as('userDashboardUrl').as('userDashboardUrl')

 
})


export { }
declare global {
  namespace Cypress {
    interface Chainable {
      getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
      loginAsUser(email: string, password: string): Chainable<void>;

    }
  }
}