import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarConsultaVM } from '../models/listar-consulta.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() consulta!: ListarConsultaVM;
  @Output() onEnviarConsulta: EventEmitter<ListarConsultaVM> = new EventEmitter();
  @Output() onEnviarConsultaVisualizacao: EventEmitter<ListarConsultaVM> = new EventEmitter();

  excluir(consulta: ListarConsultaVM){
    this.onEnviarConsulta.emit(consulta);
  }

  visualizar(consulta: ListarConsultaVM){
    this.onEnviarConsultaVisualizacao.emit(consulta)
  }
}
