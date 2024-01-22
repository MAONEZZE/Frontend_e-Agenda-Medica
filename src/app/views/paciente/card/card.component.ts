import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ListarPacienteVM } from '../models/listar-paciente.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() paciente!: ListarPacienteVM;
  @Output() onEnviarPaciente: EventEmitter<ListarPacienteVM> = new EventEmitter();
  @Output() onEnviarPacienteVisualizacao: EventEmitter<ListarPacienteVM> = new EventEmitter();

  excluir(paciente: ListarPacienteVM){
    this.onEnviarPaciente.emit(paciente);
  }

  visualizar(paciente: ListarPacienteVM){
    this.onEnviarPacienteVisualizacao.emit(paciente)
  }
}
