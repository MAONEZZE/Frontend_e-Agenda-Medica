/// <reference types="Cypress" />

Cypress.Commands.add('ClicarNoElemento', (elemento) => {
    cy.get(elemento)
        .should('exist')
        .and('be.visible')
        .click()
})

Cypress.Commands.add('EscreverNoElemento', (elemento, texto) => {
    cy.get(elemento)
        .should('exist')
        .and('be.visible')
        .type(texto)
})

Cypress.Commands.add('ValidaElemento', (elemento) => {
    cy.get(elemento)
        .should('exist')
        .and('be.visible')
})

Cypress.Commands.add('ValidarElementoDesabilitado', (elemento) => {
    cy.get(elemento)
        .should('exist')
        .and('be.visible')
        .and('be.disabled')
})

Cypress.Commands.add('ClicarNoPrimeiroElemento', (elemento) => {
    cy.get(elemento)
        .should('exist')
        .and('be.visible')
        .first()
        .click()
})

Cypress.Commands.add('ValidarTextoNoElemento', (elemento, texto) => {
    cy.get(elemento)
        .should('exist')
        .and('be.visible')
        .and('have.text', texto)
})

Cypress.Commands.add('ValidarTextoNoElementoComContains', (elemento, texto) => {
    cy.get(elemento)
        .contains(texto)
        .should('exist')
        .and('be.visible')
})

Cypress.Commands.add('LimparElemento', (elemento) => {
    cy.get(elemento)
        .should('exist')
        .and('be.visible')
        .clear()
})

Cypress.Commands.add('MarcarCheckBox', (checkBox) => {
    cy.get(checkBox)
        .should('exist')
        .and('be.visible')
        .check()
})

Cypress.Commands.add('MarcaCheckboxGrid', (elemento) => {
    cy.get(elemento)
        .should('be.checked')
        .check()
})
