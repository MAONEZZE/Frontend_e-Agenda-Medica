import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  estaCarregando$!: Observable<boolean>;
  usuarioEstaLogado$!: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
      );

  constructor(private loading: LoadingService ,private authService: AuthService, private router: Router, private toastService: ToastrService){}
  
  ngOnInit(): void {
    this.usuarioEstaLogado$ = this.authService.obterUsuarioAutenticado()
      .pipe(
        map((usuario) => {
          if(!usuario){
            return false;
          }

          return true;
        })
      )
      
    this.estaCarregando$ = this.loading.estaCarregado();
  }

  logout(){
    this.authService.logout().subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  processarSucesso(){
    this.toastService.success(`Logout com sucesso!`, 'Sucesso');
    this.router.navigate(['/login']);
  }

  processarFalha(error: Error){
    this.toastService.error(error.message, 'Error');
  }
}
    