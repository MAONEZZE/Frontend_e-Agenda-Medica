import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { InserirPacienteComponent } from './inserir-paciente/inserir-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { ListarPacienteVM } from './models/listar-paciente.view-model';
import { PacienteService } from './services/paciente.service';
import { FormPacienteVM } from './models/form-paciente.view-model';
import { VisualizarPacienteVM } from './models/visualizar-paciente.view-model';
import { loginGuard } from 'src/app/core/auth/guards/login.guard';

export const listarPacienteResolver: ResolveFn<ListarPacienteVM[]> = () => {
  return inject(PacienteService).selecionarTodos();
};

const formPacienteResolver: ResolveFn<FormPacienteVM> = (route: ActivatedRouteSnapshot) => {
  return inject(PacienteService).selecionarPacientePorId(route.paramMap.get('id')!);
};

const visualizarPacienteResolver: ResolveFn<VisualizarPacienteVM> = (route: ActivatedRouteSnapshot) => {
  return inject(PacienteService).selecionarPacienteCompletoPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarPacienteComponent,
    resolve: { pacientes: listarPacienteResolver }
  },
  {
    path: 'inserir',
    component: InserirPacienteComponent
  },
  {
    path: 'editar/:id',
    component: EditarPacienteComponent,
    resolve: { paciente: formPacienteResolver }
  },
  // {
  //   path: 'excluir/:id',
  //   component: ExcluirPacienteComponent,
  //   resolve: { paciente: visualizarPacienteResolver } 
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
