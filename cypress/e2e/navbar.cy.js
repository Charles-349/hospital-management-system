describe('Navbar Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })
     it("contains correct header text", () => {
        cy.getDataTest('medical-introduction-header').should('contain.text', 'SmartCare — Smart Patient Care')
    })
        it("Menu works Correctly", () => {
        cy.visit('/')
        // click on the mobile menu bars
        cy.getDataTest("medical-mobile-menu-bars").click()

        cy.getDataTest("medical-ul-menu").should('be.visible')

        // Verify all menu items are present and visible
        cy.get('[data-test="medical-ul-menu"]').within(() => {
            
            cy.contains('Home')
            cy.get('a[href="/"]').should('contain.text', 'Home')

            cy.contains('About')
            cy.get('a[href="/about"]').should('contain.text', 'About')

            cy.contains('Contacts')
            cy.get('a[href="/contact"]').should('contain.text', 'Contact')

            cy.contains('Register').should('be.visible')
            cy.get('a[href="/register"]').should('contain.text', 'Register')

            cy.contains('Login').should('be.visible')
            cy.get('a[href="/login"]').should('contain.text', 'Login')

        })
    })

})
