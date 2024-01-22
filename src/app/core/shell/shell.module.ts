import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule, 
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule { }
