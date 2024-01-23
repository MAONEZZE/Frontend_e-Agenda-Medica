import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarConsultaComponent } from './listar-consulta/listar-consulta.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { ConsultaService } from './services/consulta.service';
import { ListarPacienteVM } from '../paciente/models/listar-paciente.view-model';
import { FormConsultaVM } from './models/form-consulta.view-model';
import { VisualizarConsultaVM } from './models/visualizar-consulta.view-model';
import { listarMedicoResolver } from '../medico/medico-routing.module';
import { listarPacienteResolver } from '../paciente/paciente-routing.module';

const listarConsultaResolver: ResolveFn<ListarPacienteVM[]> = () => {
  return inject(ConsultaService).selecionarTodos();
};

const formConsultaResolver: ResolveFn<FormConsultaVM> = (route: ActivatedRouteSnapshot) => {
  return inject(ConsultaService).selecionarConsultaPorId(route.paramMap.get('id')!);
};

const visualizarConsultaResolver: ResolveFn<VisualizarConsultaVM> = (route: ActivatedRouteSnapshot) => {
  return inject(ConsultaService).selecionarConsultaCompletaPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarConsultaComponent,
    resolve: { consultas: listarConsultaResolver }
  },
  {
    path: 'inserir',
    component: InserirConsultaComponent
  },
  {
    path: 'editar/:id',
    component: EditarConsultaComponent,
    resolve: { consulta: formConsultaResolver,
      medicos: listarMedicoResolver, 
      pacientes: listarPacienteResolver  }
  },
  // {
  //   path: 'excluir/:id',
  //   component: ExcluirConsultaComponent,
  //   resolve: { consulta: visualizarConsultaResolver }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
