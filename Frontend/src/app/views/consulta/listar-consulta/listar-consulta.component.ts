import { Component } from '@angular/core';
import { ListarConsultaVM } from '../models/listar-consulta.view-model';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConsultaService } from '../services/consulta.service';
import { DialogExcluirComponent } from 'src/app/shared/componentes/dialog-excluir/dialog-excluir.component';
import { DialogVisualizacaoComponent } from '../dialog/dialog-visualizacao/dialog-visualizacao.component';

@Component({
  selector: 'app-listar-consulta',
  templateUrl: './listar-consulta.component.html',
  styleUrls: ['./listar-consulta.component.scss']
})
export class ListarConsultaComponent {
  consultas$!: Observable<ListarConsultaVM[]>;

  constructor(private overlay: Overlay, private consultaService: ConsultaService, private toastrService: ToastrService, private route: ActivatedRoute, private dialog: MatDialog){}

  ngOnInit(): void {
    this.consultas$ = this.route.data.pipe(map((dados) => dados['consultas']));
  }

  visualizar(consulta: ListarConsultaVM){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    
    this.consultaService.selecionarConsultaCompletaPorId(consulta.id).subscribe((consultaRes) => {

      dialogConfig.data = { registro: consultaRes }

      this.dialog.open(DialogVisualizacaoComponent, dialogConfig);
    })
  }

  excluir(consulta: ListarConsultaVM){
    let result = this.dialog.open(DialogExcluirComponent, {
      data: { 
        registro: consulta.titulo
      }
    });

    result.afterClosed().subscribe(res => {
      if(res == true){
        this.consultaService.excluir(consulta.id).subscribe({
          next: () => this.processarSucessoExclusao(),
          error: (err) => this.processarFalhaExclusao(err)
        })
      }
    });
  }

  selecionarTodas(){
    this.consultas$ = this.consultaService.selecionarTodos();
  }

  selecionarParaHoje(){
    this.consultas$ = this.consultaService.selecionarTodosConsultasParaHoje();
  }

  selecionarFuturas(){
    this.consultas$ = this.consultaService.selecionarConsultasFuturas();
  }

  selecionarPassadas(){
    this.consultas$ = this.consultaService.selecionarConsultasPassadas();
  }

  processarSucessoExclusao(): void {
    this.toastrService.success(`Consulta excluida com sucesso`, 'Exclusão')
    this.consultas$ = this.consultaService.selecionarTodos();
  }

  processarFalhaExclusao(err: Error): void {
    this.toastrService.error(err.message, 'Error')
  }
}
