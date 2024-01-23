import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LoadingService } from 'src/app/core/loading/loading.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  form!: FormGroup;
  estaCarregando$!: Observable<boolean>;
  desabilitado: boolean = false;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private loading: LoadingService, private router: Router,private toastService: ToastrService, private formBuilder: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.estaCarregando$ = this.loading.estaCarregado();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  registrar(){
    if(this.form.invalid){
      for(let item of this.form.validate()){
        this.toastService.error(item);
      }
      return;
    }

    this.desabilitado = true;

    this.authService.registrar(this.form.value).subscribe({
      next: (token) => this.processarSucesso(token),
      error: (err) => this.processarFalha(err)
    })
  }

  processarSucesso(registro: any){
    this.toastService.success(`${registro.usuarioToken.nome} foi registrado com sucesso!`, 'Sucesso');
    this.router.navigate(['/dashboard']);
  }

  processarFalha(error: Error){
    this.desabilitado = false;
    this.toastService.error(error.message, 'Error');
  }
}
