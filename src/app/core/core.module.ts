import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from './shell/shell.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellModule,
  ],
  exports: [
    ShellModule,
    AuthModule
  ]
})
export class CoreModule { }
