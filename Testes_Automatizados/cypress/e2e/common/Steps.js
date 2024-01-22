/// <reference types="cypress"/>

import Page from "./Page";
const page = new Page;

import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"

Given(/^acessar o site de exemplos$/, () => {
    page.AcessarPaginaExemplos();
});
