import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { FormCirurgiaVM } from '../models/form-cirurgia.view-model';

@Injectable({
  providedIn: 'root'
})
export class CirurgiaService {
  private url: string = "https://e-agenda-medica-api-sz61.onrender.com/api/cirurgia";

  constructor(private http: HttpClient) { }

  private processarErroHttp(error: HttpErrorResponse){
    let msgErro = '';

    if(error.error.errors.length == 0){   
      if(error.status == 401){
        msgErro = 'O usuário não está autorizado. Faça o o login e tente novamente.';
      }
      else if(error.status == 400){
        msgErro = 'Falha na requisição do serviço, verifique se o formulario está correto';
      }
      else if(error.status == 404){
        msgErro = 'Recurso não encontrado';
      }
      else if(error.status == 0){
        msgErro = 'Ocorreu um erro ao processar a requisição.';
      }
      else if(error.status == 500){
        msgErro = 'Ocorreu um erro no servidor.';
      }
    }
    else{
      msgErro = error.error.errors[0];
    }

    return throwError(() => new Error(msgErro));
  }

  public inserir(cirurgia: any): Observable<any>{
    return this.http.post<any>(`${this.url}`, cirurgia)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public editar(id: string, cirurgia: any): Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`, cirurgia)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public excluir(id: string): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public selecionarTodos(): Observable<any[]>{
    return this.http.get<any>(this.url).pipe(
      map((x: any) => x.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarCirurgiaPorId(id: string){
    return this.http
    .get<any>(`${this.url}/${id}`)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarCirurgiaCompletaPorId(id: string){
    return this.http
    .get<any>(`${this.url}/visualizacao-completa/${id}`)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarTodosCirurgiasParaHoje(){
    return this.http.get<any>(`${this.url}/cirurgias-para-hoje`).pipe(
      map((x: any) => x.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarCirurgiasFuturas(){
    //formato yyyy-mm-dd
    return this.http.get<any>(`${this.url}/cirurgias-futuras`).pipe(
      map((x: any) => x.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarCirurgiasPassadas(){
    //formato yyyy-mm-dd
    return this.http.get<any>(`${this.url}/cirurgias-passadas`).pipe(
      map((x: any) => x.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }
}
