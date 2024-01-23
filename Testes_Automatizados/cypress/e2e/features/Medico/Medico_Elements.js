/// <reference types="cypress"/>

class MedicoElements {
  nome = () => { '[data-cy=nome]' }
  cpf =  () => { '[data-cy=cpf]' }
  crm =  () => { '[data-cy=crm]' }
}

export default MedicoElements;
