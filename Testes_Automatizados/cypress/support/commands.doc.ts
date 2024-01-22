/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Comando para clicar no botão + validações - exist e be.visible
     * 
     * @param botao string
     * @example cy.ClicarNoElemento(elements.BotaoEntrar())
     */
    ClicarNoElemento(botao: string): void

    /**
     * Comando para escrever um texto no elemento + validações - exist e be.visible
     * 
     * @param elemento string
     * @param texto string
     * @example cy.EscreverNoElemento(elements.LoginEmail(), 'exemplo@hotmail.com')
     */
    EscreverNoElemento(elemento: string, texto: string): void

    /**
     * Comando para validações de elementos - exist e be.visible
     * 
     * @param botao string
     * @example cy.ValidaElemento(elements.BotaoEntrar())
     */
    ValidaElemento(botao: string): void

    /**
     * Comando para validar se o elemento está desabilitado
     * 
     * @param botao string
     * @example cy.ValidarElementoDesabilitado(elements.btnEnviar())
     */
    ValidarElementoDesabilitado(botao: string): void

    /**
     * Comando para clicar no primeiro botão da tela + validações - exist e be.visible
     * 
     * @param botao string
     * @example cy.ClicarNoPrimeiroElemento(elements.BotaoEntrar())
     */
    ClicarNoPrimeiroElemento(botao: string): void

    /**
     * Comando para validar(have.text) o texto no elemento  + validações - exist e be.visible
     * 
     * @param elemento string
     * @param texto string
     * @example cy.ValidarTextoNoElemento(elements.Email(), 'validaEmail@hotmail.com')
     */
    ValidarTextoNoElemento(elemento: string, texto: string): void

    /**
     * Comando para validar(contains) o texto no elemento  + validações - exist e be.visible
     * 
     * @param elemento string
     * @param texto string
     * @example cy.ValidarTextoNoElementoComContains(elements.Email(), 'validaEmail@hotmail.com')
     */
    ValidarTextoNoElementoComContains(elemento: string, texto: string): void

    /**
     * Comando para limpar um elemento da página
     * 
     * @param elemento string
     * @example cy.LimparElemento(servicosImpressao_FilasElements.inserePortaRaw())
     */
    LimparElemento(elemento: string): void

    /**
     * Comando para marcar o checkBox
     *
     * @param checkBox string
     * @example cy.MarcarCheckBox(elements.checkBox())
     */
    MarcarCheckBox(checkBox: string): void

    /**
     * Comando para marcar um checkbox no grid
     * 
     * @param elemento ELemento do checkbox no grid
     * @example cy.MarcaCheckboxGrid(btn.elemento)
     */
    MarcaCheckboxGrid(botao: string): void
  }
}
