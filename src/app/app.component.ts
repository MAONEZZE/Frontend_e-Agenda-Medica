import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-AgendaMedica';
  usuarioEstaLogado$!: Observable<any>;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.usuarioEstaLogado$ = this.authService.obterUsuarioAutenticado();
  }
}
