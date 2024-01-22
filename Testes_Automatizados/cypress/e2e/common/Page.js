/// <reference types="cypress"/>

import Elements from "./Elements";
const elements = new Elements;

class Page {
    AcessarPaginaExemplos() {
        cy.visit("https://example.cypress.io/todo");
    }
}

export default Page;