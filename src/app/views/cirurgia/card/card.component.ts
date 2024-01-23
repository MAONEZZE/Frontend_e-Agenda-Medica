import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarCirurgiaVM } from '../models/listar-cirurgia.view-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cirurgia!: ListarCirurgiaVM;
  @Output() onEnviarCirurgia: EventEmitter<ListarCirurgiaVM> = new EventEmitter();
  @Output() onEnviarCirurgiaVisualizacao: EventEmitter<ListarCirurgiaVM> = new EventEmitter();

  excluir(cirurgia: ListarCirurgiaVM){
    this.onEnviarCirurgia.emit(cirurgia);
  }

  visualizar(cirurgia: ListarCirurgiaVM){
    this.onEnviarCirurgiaVisualizacao.emit(cirurgia);
  }
}
