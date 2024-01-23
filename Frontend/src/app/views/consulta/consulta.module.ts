import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ListarConsultaComponent } from './listar-consulta/listar-consulta.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogVisualizacaoComponent } from './dialog/dialog-visualizacao/dialog-visualizacao.component';


@NgModule({
  declarations: [
    ListarConsultaComponent,
    InserirConsultaComponent,
    EditarConsultaComponent,
    CardComponent,
    DialogVisualizacaoComponent,
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    SharedModule
  ]
})
export class ConsultaModule { }
