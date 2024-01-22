import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { MedicoService } from './services/medico.service';
import { FormMedicoVM } from './models/form-medico.view-model';
import { ListarMedicoVM } from './models/listar-medico.view-model';
import { VisualizarMedicoVM } from './models/visualizar-medico.view-model';

export const listarMedicoResolver: ResolveFn<ListarMedicoVM[]> = () => {
  return inject(MedicoService).selecionarTodos();
};

const formMedicoResolver: ResolveFn<FormMedicoVM> = (route: ActivatedRouteSnapshot) => {
  return inject(MedicoService).selecionarMedicoPorId(route.paramMap.get('id')!);
};

const visualizarMedicoResolver: ResolveFn<VisualizarMedicoVM> = (route: ActivatedRouteSnapshot) => {
  return inject(MedicoService).selecionarMedicoCompletoPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component:ListarMedicoComponent,
    resolve: { medicos: listarMedicoResolver }
  },
  {
    path: 'inserir',
    component: InserirMedicoComponent
  },
  {
    path: 'editar/:id',
    component: EditarMedicoComponent,
    resolve: { medico: formMedicoResolver }
  },
  // {
  //   path: 'excluir/:id',
  //   component: ExcluirMedicoComponent,
  //   resolve: { medico: visualizarMedicoResolver }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
