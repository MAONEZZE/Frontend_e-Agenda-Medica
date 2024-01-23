import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormMedicoVM } from '../models/form-medico.view-model';
import { MedicoService } from '../services/medico.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss']
})
export class EditarMedicoComponent {
  form!: FormGroup;
  pacienteVM!: FormMedicoVM;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    private formBuilder: FormBuilder, 
    private medicoService: MedicoService, 
    private router: Router, 
    private toastrService: ToastrService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    const medico = this.route.data.pipe(map(x => x['medico']));

    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    });

    medico.subscribe(x => this.form.patchValue(x))
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

    this.medicoService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormMedicoVM) {
    this.toastrService.success(
      `O Medico "${res.nome}" alterado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
