describe("navigating multiple pages", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.viewport(1280, 720)
    })

    it("should visit multiple pages", () => {
        // verify that we are on the home page
        cy.location("pathname").should("equal", "/")
        cy.getDataTest('medical-introduction-header').should('contain.text', 'SmartCare — Smart Patient Care')

        cy.getDataTest("desktop-nav-about").as("aboutLink")

        cy.get('@aboutLink').click()
        cy.location("pathname").should("equal", "/about")
        cy.contains("About SmartCare").should("be.visible")

        cy.getDataTest("desktop-nav-contact").as("contactLink");
        cy.get("@contactLink").click();
        cy.location("pathname").should("equal", "/contact");

        cy.getDataTest("desktop-nav-register").as("registerLink");
        cy.get("@registerLink").click();
        cy.location("pathname").should("equal", "/register");
        cy.contains("Create Your Account").should("be.visible")

        cy.visit('/');
        cy.getDataTest("desktop-nav-login").click();
        cy.location("pathname").should("equal", "/login");
        cy.contains("Login to Your Account").should("be.visible")

    })
})