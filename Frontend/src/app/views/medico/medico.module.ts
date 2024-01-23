import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './card/card.component';
import { DialogVisualizacaoComponent } from './dialog/dialog-visualizacao/dialog-visualizacao.component';
import { DialogDatasComponent } from './dialog/dialog-datas/dialog-datas.component';
import { DialogService } from './services/dialog.service';
import { MedicoService } from './services/medico.service';


@NgModule({
  declarations: [
    EditarMedicoComponent,
    InserirMedicoComponent,
    ListarMedicoComponent,
    CardComponent,
    DialogVisualizacaoComponent,
    DialogDatasComponent,
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    SharedModule,
  ],
  providers: [DialogService, MedicoService]
})
export class MedicoModule { }
