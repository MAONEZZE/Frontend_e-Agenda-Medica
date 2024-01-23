import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { DialogExcluirComponent } from 'src/app/shared/componentes/dialog-excluir/dialog-excluir.component';
import { DialogService } from '../../services/dialog.service';
import { ListarMedicoVM } from '../../models/listar-medico.view-model';

@Component({
  selector: 'app-dialog-datas',
  templateUrl: './dialog-datas.component.html',
  styleUrls: ['./dialog-datas.component.scss']
})
export class DialogDatasComponent {
  medicos!: ListarMedicoVM[];

  dataMaxima: Date = new Date();

  dataI!: Date;
  dataT!: Date;

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  
  constructor(
    private dialogService: DialogService,
    public dialogRef: MatDialogRef<DialogExcluirComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dialogService.onEnviarlista.asObservable().subscribe(x => this.medicos = x);

    this.abrirDialog();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  abrirDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '300px';

    this.dialogRef.updateSize(dialogConfig.width);
  }

  enviarDatas(){
    this.medicos = [];

    let dataInicio = new Date(this.dataI).toISOString();
    let dataTermino = new Date(this.dataT).toISOString();

    this.dialogService.onEnviarData.emit({data1: dataInicio, data2: dataTermino});
  }
}
