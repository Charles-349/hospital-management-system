describe("appointments tests", () => {
    beforeEach(() => {
        cy.viewport(1920, 900);
        // login as a user
        cy.loginAsUser()

    })
    it('should create an appointment via the UI', () => {
        cy.visit('/user/dashboard/doctors')
        // click on book appointment btn
        cy.get('[data-test="book-appointment-button"]').eq(0).click();
        cy.get('[data-test="appointment-date-input"]').type('2025-07-31');
        cy.get('[data-test="appointment-time-input"]').type('10:00');
        cy.get('[data-test="appointment-totalAmount-input"]').type('1000');
        cy.get('[data-test="appointment-submit-button"]').click();
        cy.contains('Appointment created successfully').should('be.visible');

        // spy on the DELETE request
        cy.intercept('DELETE', '/appointment/*').as('deleteAppointment');
        cy.visit("/user/dashboard/appointments");
        cy.wait(1000);
        // delete the appointment
        cy.get('[data-test="delete-appointment-button"]').last().click();
        cy.get('[data-test="confirm-delete-button"]').click();
        cy.wait('@deleteAppointment')
        cy.contains('Appointment deleted successfully!').should('be.visible');
        cy.contains("2025-07-31").should("not.exist");

    })
    it.only('should update an appointment via the UI', () => {
        cy.visit('/user/dashboard/doctors')
        // click on book appointment btn
        cy.get('[data-test="book-appointment-button"]').eq(0).click();
        cy.get('[data-test="appointment-date-input"]').type('2025-07-31');
        cy.get('[data-test="appointment-time-input"]').type('10:00');
        cy.get('[data-test="appointment-totalAmount-input"]').type('1000');
        cy.get('[data-test="appointment-submit-button"]').click();
        cy.contains('Appointment created successfully').should('be.visible');

        //update now
        cy.visit("/user/dashboard/appointments");
        cy.wait(1000);
        cy.get('[data-test="edit-todo-button"]').last().click();

        cy.get('[data-test="edit-appointment-date-input"]').clear().type('2025-07-29');
        cy.get('[data-test="edit-appointment-time-input"]').clear().type('10:00');
        cy.get('[data-test="edit-appointment-amount-input"]').clear().type('10:00');
        cy.get('[data-test="update-appointment-button"]').click();
        cy.contains('Appointment updated successfully').should('be.visible');

          // spy on the DELETE request
        cy.intercept('DELETE', '/appointment/*').as('deleteAppointment');
        cy.visit("/user/dashboard/appointments");
        cy.wait(1000);
        // delete the appointment
        cy.get('[data-test="delete-appointment-button"]').last().click();
        cy.get('[data-test="confirm-delete-button"]').click();
        cy.wait('@deleteAppointment')
        cy.contains('Appointment deleted successfully!').should('be.visible');
        cy.contains("2025-07-31").should("not.exist");

    })
})
