import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarRoutingModule } from './registrar-routing.module';
import { RegistrarComponent } from './registrar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrarRoutingModule
  ]
})
export class RegistrarModule { }
