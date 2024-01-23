import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListarPacienteVM } from '../../paciente/models/listar-paciente.view-model';
import { ListarMedicoVM } from '../../medico/models/listar-medico.view-model';
import { FormCirurgiaVM } from '../models/form-cirurgia.view-model';
import { PacienteService } from '../../paciente/services/paciente.service';
import { MedicoService } from '../../medico/services/medico.service';
import { CirurgiaService } from '../services/cirurgia.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-inserir-cirurgia',
  templateUrl: './inserir-cirurgia.component.html',
  styleUrls: ['./inserir-cirurgia.component.scss']
})
export class InserirCirurgiaComponent implements OnInit{
  form!: FormGroup;
  pacientes!: ListarPacienteVM[];
  medicos!: ListarMedicoVM[];
  cirurgiaVM!: FormCirurgiaVM;

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private formBuilder: FormBuilder, 
    private cirurgiaService: CirurgiaService,
    private toastrService: ToastrService,
    private router: Router,
    private pacienteService: PacienteService, 
    private medicoService: MedicoService) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      paciente_id: new FormControl('', [Validators.required]),
      data: new FormControl(new Date(), [Validators.required]),
      horaInicio: new FormControl('00:00', [Validators.required]),
      horaTermino: new FormControl('00:00', [Validators.required]),
      id_medicos: new FormControl([], [Validators.required]),
    });

    this.medicoService.selecionarTodos().subscribe(medicos => this.medicos = medicos);
    this.pacienteService.selecionarTodos().subscribe(pacientes => this.pacientes = pacientes);
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

    const horaTermino = this.form.get('horaTermino')?.value;
    const horaInicio = this.form.get('horaInicio')?.value;

    this.form.get('horaInicio')?.setValue(`${horaInicio}:00`);
    this.form.get('horaTermino')?.setValue(`${horaTermino}:00`);

    this.cirurgiaService.inserir(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormCirurgiaVM) {
    this.toastrService.success(
      `A Cirurgia "${res.titulo}" cadastrada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/cirurgias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }

}
