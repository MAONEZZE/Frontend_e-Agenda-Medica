import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormPacienteVM } from '../models/form-paciente.view-model';
import { PacienteService } from '../services/paciente.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.scss']
})
export class EditarPacienteComponent {
  form!: FormGroup;
  pacienteVM!: FormPacienteVM;

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private formBuilder: FormBuilder, 
    private pacienteService: PacienteService, 
    private router: Router, 
    private toastrService: ToastrService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    const paciente = this.route.data.pipe(map(x => x['paciente']));
    
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl(null, [Validators.required]),
    });

    paciente.subscribe(x => this.form.patchValue(x));
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

    const id = this.route.snapshot.paramMap.get('id')!;

    this.pacienteService.editar(id, this.form?.value).subscribe({
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
