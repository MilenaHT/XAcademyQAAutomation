describe('TesteosActividad', { testIsolation: false }, () => {
    it('Verificación de Info Hotel', () => {
        cy.visit('https://automationintesting.online/')
        cy.get('p').contains('Shady Meadows B&B')
        cy.get('p').contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S')
        cy.get('p').contains('012345678901')
        cy.get('p').contains('fake@fakeemail.com')
    })

    it('Verificar si tiene al menos una imagen', () => {
        cy.get('img').should('be.visible')
    })

    it('Verificar el texto de la descripción', () => {
        cy.get('p').contains('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.')
    })

    it('Interacción API 1 - Envío successful del formulario', () => {
        cy.intercept('POST', '/message/').as('formPass')
        cy.visit('https://automationintesting.online/')
        cy.validarEnvioFormCorrecto();
        cy.wait('@formPass').then(interception => {
            expect(interception.response.statusCode).to.equal(201)
        })
        cy.log('El formulario se envió correctamente.')
    })


    it.skip('Interacción API 2 - Envío failed del formulario por número de telefono con letras.', () => {
        cy.intercept('POST', '/message/').as('formPass')
        cy.visit('https://automationintesting.online/')
        cy.get('#name').type('Prueba Formulario')
        cy.get('[placeholder="Email"]').type('prueba@prueba.com')
        cy.get('#phone').type('asdfghjklqwe')
        cy.get('[placeholder="Subject"]').type('Relleno el asunto')
        cy.get('#description').type('Esto es otra descripción de mas de 20 caracteres tal como se solicita en el campo. blablabla. blablabla.')
        cy.get('#submitContact').click()
        cy.wait('@formPass').then(interception => {
            expect(interception.response.statusCode).to.equal(400)
        })
        cy.log('El campo de telefono generó error por tener letras y el POST da error.')
    })
})

