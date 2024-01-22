import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirurgiaRoutingModule } from './cirurgia-routing.module';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { CirurgiaService } from './services/cirurgia.service';
import { MedicoService } from '../medico/services/medico.service';
import { PacienteService } from '../paciente/services/paciente.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { DialogVisualizacaoComponent } from './dialog/dialog-visualizacao/dialog-visualizacao.component';


@NgModule({
  declarations: [
    InserirCirurgiaComponent,
    EditarCirurgiaComponent,
    ListarCirurgiaComponent,
    CardComponent,
    DialogVisualizacaoComponent,
  ],
  imports: [
    CommonModule,
    CirurgiaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [CirurgiaService, MedicoService, PacienteService]
})
export class CirurgiaModule { }
