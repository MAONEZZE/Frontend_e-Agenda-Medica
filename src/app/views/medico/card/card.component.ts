import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListarMedicoVM } from '../models/listar-medico.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() medico!: ListarMedicoVM;
  @Output() onEnviarMedico: EventEmitter<ListarMedicoVM> = new EventEmitter();
  @Output() onEnviarMedicoVisualizacao: EventEmitter<ListarMedicoVM> = new EventEmitter();

  excluir(medico: ListarMedicoVM){
    this.onEnviarMedico.emit(medico);
  }

  visualizar(medico: ListarMedicoVM){
    this.onEnviarMedicoVisualizacao.emit(medico)
  }
}
