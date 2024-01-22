import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormPacienteVM } from '../models/form-paciente.view-model';
import { PacienteService } from '../services/paciente.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-inserir-paciente',
  templateUrl: './inserir-paciente.component.html',
  styleUrls: ['./inserir-paciente.component.scss']
})
export class InserirPacienteComponent implements OnInit{
  form!: FormGroup;
  pacienteVM!: FormPacienteVM;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private formBuilder: FormBuilder, 
    private pacienteService: PacienteService, 
    private router: Router, 
    private toastrService: ToastrService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
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

    this.pacienteService.inserir(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormPacienteVM) {
    this.toastrService.success(
      `O Paciente "${res.nome}" cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/pacientes/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }

}
