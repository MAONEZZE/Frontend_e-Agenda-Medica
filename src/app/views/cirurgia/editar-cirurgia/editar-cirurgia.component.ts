import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarMedicoVM } from '../../medico/models/listar-medico.view-model';
import { MedicoService } from '../../medico/services/medico.service';
import { ListarPacienteVM } from '../../paciente/models/listar-paciente.view-model';
import { PacienteService } from '../../paciente/services/paciente.service';
import { FormCirurgiaVM } from '../models/form-cirurgia.view-model';
import { CirurgiaService } from '../services/cirurgia.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-editar-cirurgia',
  templateUrl: './editar-cirurgia.component.html',
  styleUrls: ['./editar-cirurgia.component.scss']
})
export class EditarCirurgiaComponent implements OnInit{
  form!: FormGroup;
  pacientes!: Observable<ListarPacienteVM[]>;
  medicos!: Observable<ListarMedicoVM[]>;
  cirurgiaVM!: FormCirurgiaVM;

  datePicker!: Date;

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private formBuilder: FormBuilder, 
    private cirurgiaService: CirurgiaService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }
    
  ngOnInit(): void {
    const cirurgia = this.route.data.pipe(map(x => x['cirurgia']));

    this.medicos = this.route.data.pipe(map(x => x['medicos']));
    this.pacientes = this.route.data.pipe(map(x => x['pacientes']));

    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      paciente_id: new FormControl('', [Validators.required]),
      data: new FormControl(null, [Validators.required]),
      horaInicio: new FormControl('00:00', [Validators.required]),
      horaTermino: new FormControl('00:00', [Validators.required]),
      id_Medicos: new FormControl(null, [Validators.required]),
    });

    cirurgia.subscribe(x => this.form.patchValue(x))

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

    const id = this.route.snapshot.paramMap.get('id')!;

    this.cirurgiaService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormCirurgiaVM) {
    this.toastrService.success(
      `A Cirurgia "${res.titulo}" alterada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/cirurgias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }

}
