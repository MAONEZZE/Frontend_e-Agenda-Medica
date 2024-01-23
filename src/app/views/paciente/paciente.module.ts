import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { InserirPacienteComponent } from './inserir-paciente/inserir-paciente.component';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { PacienteService } from './services/paciente.service';
import { DialogVisualizacaoComponent } from './dialog/dialog-visualizacao/dialog-visualizacao.component';


@NgModule({
  declarations: [
    InserirPacienteComponent,
    EditarPacienteComponent,
    ListarPacienteComponent,
    CardComponent,
    DialogVisualizacaoComponent,
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    SharedModule
  ],
  providers: [PacienteService]
})
export class PacienteModule { }
