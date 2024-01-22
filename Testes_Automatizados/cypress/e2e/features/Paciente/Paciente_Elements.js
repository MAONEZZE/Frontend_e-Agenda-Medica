/// <reference types="cypress"/>

class PacienteElements {
  nome =     () => { '[data-cy=nome]' }
  cpf =      () => { '[data-cy=cpf]' }
  email =    () => { '[data-cy=email]' }
  telefone = () => { '[data-cy=telefone]' }
  dataN =    () => { '[data-cy=data]' }
}

export default PacienteElements;
