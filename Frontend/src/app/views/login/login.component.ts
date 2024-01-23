import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  estaCarregando$!: Observable<boolean>;
  desabilitado: boolean = false;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private loading: LoadingService, private router: Router, private toastService: ToastrService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.estaCarregando$ = this.loading.estaCarregado();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  
  login(){
    
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }
      return;
    }
    
    this.desabilitado = true;
    
    this.authService.login(this.form.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err)
    })
  }

  processarSucesso(login: any){
    this.toastService.success(`Seja Bem Vindo, ${login.usuarioToken.nome}`, 'Sucesso');
    this.router.navigate(['/dashboard']);
  }

  processarFalha(error: Error){
    this.desabilitado = false;
    this.toastService.error(error.message, 'Error');
  }
}
