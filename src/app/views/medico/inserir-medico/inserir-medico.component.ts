import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormMedicoVM } from '../models/form-medico.view-model';
import { MedicoService } from '../services/medico.service';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss']
})
export class InserirMedicoComponent  implements OnInit{
  form!: FormGroup;
  pacienteVM!: FormMedicoVM;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private formBuilder: FormBuilder, 
    private medicoService: MedicoService, 
    private router: Router, 
    private toastrService: ToastrService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.medicoService.inserir(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormMedicoVM) {
    this.toastrService.success(
      `O Medico "${res.nome}" cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
