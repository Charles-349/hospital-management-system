describe("signup tests", () => {
    beforeEach(() => {
        cy.visit('/register')
        cy.viewport(1280, 920)
    })

    it("should signup with valid credentials", () => {

        cy.intercept('POST', '/user', {
            statusCode: 201,
            body: {
                message: 'Registration successful! Please check your email for verification code.',
                user: {
                    id: 123,
                    firstName: 'TestUser',
                    lastName: 'AdminTester',
                    email: 'wamahiucharles123@gmail.com',
                    contactPhone: '0701656349',
                    address: '12402',
                    role: 'user',
                    isVerified: false
                }
            }
        }).as('signup')

        cy.getDataTest('signup-firstname').as('firstNameInput')
        cy.get('@firstNameInput')
            .type('TestUser')

        cy.getDataTest('signup-lastname').as('lastNameInput')
        cy.get('@lastNameInput')
            .type('AdminTester')

        cy.getDataTest('signup-email').as('emailInput')
        cy.get('@emailInput')
            .should('have.attr', 'type', 'email')
            .type('wamahiucharles123@gmail.com')

        cy.getDataTest('signup-contactPhone').as('contactPhoneInput')
        cy.get('@contactPhoneInput')
            .should('have.attr', 'type', 'text')
            .type('0701656349')
        
        cy.getDataTest('signup-address').as('addressInput')
        cy.get('@addressInput')
            .should('have.attr', 'type', 'text')
            .type('12402');

        cy.getDataTest('signup-password').as('passwordInput')
        cy.get('@passwordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        cy.getDataTest('signup-confirmpassword').as('confirmPasswordInput')
        cy.get('@confirmPasswordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .should('not.be.disabled')
            .click()

        // Wait for the mocked signup API call
        cy.wait('@signup')
            .then((interception) => {
                expect(interception.response.statusCode).to.eq(201)
                // verifications
                expect(interception.request.body).to.deep.include({
                    firstName: 'TestUser',
                    lastName: 'AdminTester',
                    email: 'wamahiucharles123@gmail.com',
                    contactPhone: '0701656349',
                    address: '12402',
                    password: 'mypass123',
                    confirmPassword: 'mypass123'
                })
            })

        cy.contains("Registration successful! Please check your email for verification code.")

        // Should redirect to verification page
        cy.url().should('include', '/register/verify')
    })


    it("should show validation errors for empty fields", () => {
        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .click()

        cy.contains(/First name is required/i);
        cy.contains(/Last name is required/i);
        cy.contains(/Email is required/i);
        cy.contains(/PhoneNumber is required/i);
        cy.contains(/Address is required/i);
        cy.contains(/Password is required/i);
        cy.contains(/Confirm password is required/i)
    })

    it("should show error if passwords do not match", () => {
        cy.getDataTest('signup-firstname').as('firstNameInput')
        cy.get('@firstNameInput').type('TestUser');

        cy.getDataTest('signup-lastname').as('lastNameInput')
        cy.get('@lastNameInput').type('AdminTester');

        cy.getDataTest('signup-email').as('emailInput')
        cy.get('@emailInput').type('wamahiucharles123@gmail.com');
        cy.getDataTest('signup-contactPhone').as('contactPhoneInput')
        cy.get('@contactPhoneInput').type('0701656349');
        cy.getDataTest('signup-address').as('addressInput')
        cy.get('@addressInput').type('12402');

        cy.getDataTest('signup-password').as('passwordInput')
        cy.get('@passwordInput').type('mypass123');

        cy.getDataTest('signup-confirmpassword').as('confirmPasswordInput')
        cy.get('@confirmPasswordInput').type('differentpass')

        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .click()

        cy.contains(/Passwords must match/i)

    })



})