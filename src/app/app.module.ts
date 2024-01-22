import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import "./extension/form-group.extensions";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { ShellModule } from './core/shell/shell.module';
import { loadingInterceptor } from './core/loading/interceptor-loading';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { LoadingService } from './core/loading/loading.service';
import { AuthService } from './core/auth/services/auth.service';
import { httpTokenInterceptor } from './core/auth/services/http-token.interceptor';
import { LoginModule } from './views/login/login.module';
import { RegistrarModule } from './views/registrar/registrar.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

const locale = 'pt-BR'

registerLocaleData(localePt, locale)

function logarUsuarioSalvoFactory(authService: AuthService){
  return () => authService.logarUsuarioSalvo();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    
    CoreModule,
    ShellModule,

    MatIconModule,
    MatToolbarModule, 
    MatSidenavModule,
    MatButtonModule,

    DashboardModule,

    LoginModule,
    RegistrarModule,

    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: locale
    },

    provideHttpClient(withInterceptors([httpTokenInterceptor, loadingInterceptor])),
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
