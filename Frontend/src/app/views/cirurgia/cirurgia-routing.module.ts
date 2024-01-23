import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarCirurgiaComponent } from './listar-cirurgia/listar-cirurgia.component';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { CirurgiaService } from './services/cirurgia.service';
import { VisualizarPacienteVM } from '../paciente/models/visualizar-paciente.view-model';
import { FormCirurgiaVM } from './models/form-cirurgia.view-model';
import { ListarCirurgiaVM } from './models/listar-cirurgia.view-model';
import { listarMedicoResolver } from '../medico/medico-routing.module';
import { listarPacienteResolver } from '../paciente/paciente-routing.module';

const listarCirurgiaResolver: ResolveFn<ListarCirurgiaVM[]> = () => {
  return inject(CirurgiaService).selecionarTodos();
};

const formCirurgiaResolver: ResolveFn<FormCirurgiaVM> = (route: ActivatedRouteSnapshot) => {
  return inject(CirurgiaService).selecionarCirurgiaPorId(route.paramMap.get('id')!);
};

const visualizarCirurgiaResolver: ResolveFn<VisualizarPacienteVM> = (route: ActivatedRouteSnapshot) => {
  return inject(CirurgiaService).selecionarCirurgiaCompletaPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarCirurgiaComponent,
    resolve: { cirurgias: listarCirurgiaResolver }
  },
  {
    path: 'inserir',
    component: InserirCirurgiaComponent
    
  },
  {
    path: 'editar/:id',
    component: EditarCirurgiaComponent,
    resolve: { cirurgia: formCirurgiaResolver, 
      medicos: listarMedicoResolver, 
      pacientes: listarPacienteResolver }
  },
  // {
  //   path: 'excluir/:id',
  //   component: ExcluirCirurgiaComponent,
  //   resolve: { cirurgia: visualizarCirurgiaResolver }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirurgiaRoutingModule { }
