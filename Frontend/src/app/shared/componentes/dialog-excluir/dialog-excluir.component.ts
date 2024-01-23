import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-excluir',
  templateUrl: './dialog-excluir.component.html',
  styleUrls: ['./dialog-excluir.component.scss']
})
export class DialogExcluirComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DialogExcluirComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.abrirDialog();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  abrirDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '300px';

    this.dialogRef.updateSize(dialogConfig.width);
  }
}
