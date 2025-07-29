describe("login functionility", () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.viewport(1280, 920)
    })

    it("should login with valid credentials", () => {

        cy.contains("Login to Your Account").should("be.visible")
        cy.getDataTest("login-email-input").as("login-emailInput")

        cy.get("@login-emailInput")
            .should("be.visible")
            .should('have.attr', 'type', 'email')
            .type('wamahiucharles123@gmail.com')


        cy.getDataTest('login-password-input').as('login-passwordInput')

        cy.get('@login-passwordInput')
            .should('be.visible')
            .should('have.attr', 'type', 'password')
            .type('12345678')


        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .should('not.be.disabled')
            .click()

        cy.contains("Login successful! Redirecting to dashboard...").should('be.visible')
        cy.url().should("include", '/admin/dashboard/appointments')


    })


    it("should not login with invalid credentials", () => {
        cy.contains("Login to Your Account").should("be.visible")


        cy.getDataTest('login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('wamahiucharles123@gmail.com')


        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
        .type('wrongpassword')

        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
        .should('contain.text', 'Login')
        .click()

        cy.contains("Login failed. Please check your credentials and try again.").should('be.visible')

    })
})