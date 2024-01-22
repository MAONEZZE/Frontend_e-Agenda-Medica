import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { ListarMedicoVM } from '../models/listar-medico.view-model';
import { FloatLabelType } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogExcluirComponent } from 'src/app/shared/componentes/dialog-excluir/dialog-excluir.component';
import { MedicoService } from '../services/medico.service';
import { DialogVisualizacaoComponent } from '../dialog/dialog-visualizacao/dialog-visualizacao.component';
import { DialogDatasComponent } from '../dialog/dialog-datas/dialog-datas.component';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.scss']
})
export class ListarMedicoComponent {
  medicos$!: Observable<ListarMedicoVM[]>;
  crmBusca: string = "";
  dataI!: Date;
  dataT!: Date;

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private dialoService: DialogService, private overlay: Overlay, private medicoService: MedicoService, private toastrService: ToastrService, private route: ActivatedRoute, private dialog: MatDialog){}

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(map((dados) => dados['medicos']));
  }
  
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  buscarPorCrm(){
    this.medicoService.selecionarMedicoPorCrm(this.crmBusca).subscribe((medicoRes) => {
      this.dialog.open(DialogVisualizacaoComponent, {
        data: { 
          registro: medicoRes
        }
      });
    })

    this.crmBusca = '';
  }

  visualizar(medico: ListarMedicoVM){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();

    this.medicoService.selecionarMedicoCompletoPorId(medico.id).subscribe((medicoRes) => {
      dialogConfig.data = { registro: medicoRes }

      this.dialog.open(DialogVisualizacaoComponent, dialogConfig);
    })
  }

  excluir(medico: ListarMedicoVM){
    let result = this.dialog.open(DialogExcluirComponent, {
      data: { 
        registro: medico.nome
      }
    });

    result.afterClosed().subscribe(res => {
      if(res == true){
        this.medicoService.excluir(medico.id).subscribe({
          next: () => this.processarSucessoExclusao(),
          error: (err) => this.processarFalhaExclusao(err)
          
        })
      }
    });
  }

  processarSucessoExclusao(): void {
    this.toastrService.success(`Medico excluido com sucesso`, 'Exclusão')
    this.medicos$ = this.medicoService.selecionarTodos();
  }

  processarFalhaExclusao(err: Error): void {
    this.toastrService.error(err.message, 'Error')
  }

  buscarMaisTrabalhadores(){
    this.dialog.open(DialogDatasComponent);

    this.dialoService.onEnviarData.asObservable().subscribe(x => {
      this.medicoService.selecionarMedicosMaisTrabalharam(x?.data1, x?.data2).subscribe(y => {
        if(y.length == 0){
          this.toastrService.error("Nenhum medico trabalhou nesse periodo")
          return;
        }
        this.dialoService.onEnviarlista.emit(y);
        this.toastrService.success("Medicos que trabalharam nesse periodo")
      });
    });

  }

  
}
