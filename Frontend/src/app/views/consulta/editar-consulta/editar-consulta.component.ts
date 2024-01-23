import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarMedicoVM } from '../../medico/models/listar-medico.view-model';
import { ListarPacienteVM } from '../../paciente/models/listar-paciente.view-model';
import { FormConsultaVM } from '../models/form-consulta.view-model';
import { ConsultaService } from '../services/consulta.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrls: ['./editar-consulta.component.scss']
})
export class EditarConsultaComponent {
  form!: FormGroup;

  pacientes!: Observable<ListarPacienteVM[]>;
  medicos!: Observable<ListarMedicoVM[]>;

  consultaVM!: FormConsultaVM;

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private formBuilder: FormBuilder, 
    private consultaService: ConsultaService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const consulta = this.route.data.pipe(map(x => x['consulta']));

    this.medicos = this.route.data.pipe(map(x => x['medicos']));
    this.pacientes = this.route.data.pipe(map(x => x['pacientes']));

    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      paciente_id: new FormControl('', [Validators.required]),
      data: new FormControl(null, [Validators.required]),
      horaInicio: new FormControl('00:00', [Validators.required]),
      horaTermino: new FormControl('00:00', [Validators.required]),
      id_Medico: new FormControl(null, [Validators.required]),
    });

    consulta.subscribe(x => this.form.patchValue(x))
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

    this.consultaService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormConsultaVM) {
    this.toastrService.success(
      `A Consulta "${res.titulo}" alterada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/consultas/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
