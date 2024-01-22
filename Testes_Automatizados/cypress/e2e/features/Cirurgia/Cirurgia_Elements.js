/// <reference types="cypress"/>

class CirurgiaElements {
  Titulo =         () => { return '[data-cy=titulo]' }
  data =           () => { return '[data-cy=data]' }
  horaInicio =     () => { return '[data-cy=horaInicio]' }
  horaTermino =    () => { return '[data-cy=horaTermino]' }
  selectPaciente = () => { return '[data-cy=selectPaciente]' }
  selectMedico =   () => { return '[data-cy=selectMedico]' }
}

export default CirurgiaElements;
