import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { authGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cirurgias',
    loadChildren: () => import("./views/cirurgia/cirurgia.module").then(modulo => modulo.CirurgiaModule),
    canActivate: [authGuard]
  },
  {
    path: 'consultas',
    loadChildren: () => import("./views/consulta/consulta.module").then(modulo => modulo.ConsultaModule),
    canActivate: [authGuard]
  },
  {
    path: 'medicos',
    loadChildren: () => import("./views/medico/medico.module").then(modulo => modulo.MedicoModule),
    canActivate: [authGuard]
  },
  {
    path: 'pacientes',
    loadChildren: () => import("./views/paciente/paciente.module").then(modulo => modulo.PacienteModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
