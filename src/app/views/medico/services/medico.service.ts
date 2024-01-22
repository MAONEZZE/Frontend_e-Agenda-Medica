import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private url: string = "https://e-agenda-medica-api-sz61.onrender.com/api/medico";

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

  public inserir(medico: any): Observable<any>{
    return this.http.post<any>(`${this.url}`, medico)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public editar(id: string, medico: any): Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`, medico)
      .pipe(
        map((res) => res.dados),
        catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
      );
  }

  public editarPorCrm(crm: string, medico: any): Observable<any>{
    return this.http.put<any>(`${this.url}/crm/${crm}`, medico)
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

  public selecionarTodos(){
    return this.http.get<any>(this.url).pipe(
      map((x: any) => x.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarMedicoPorId(id: string){
    return this.http
    .get<any>(`${this.url}/${id}`)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarMedicoCompletoPorId(id: string){
    return this.http
    .get<any>(`${this.url}/visualizacao-completa/${id}`)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarMedicosMaisTrabalharam(data: Date, data2: Date){
    return this.http
    .get<any>(`${this.url}/medicos-mais-trabalhadores?dataInicio=${data}&dataFinal=${data2}`)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }

  public selecionarMedicoPorCrm(crm: string){
    return this.http
    .get<any>(`${this.url}/crm/${crm}`)
    .pipe(
      map((res) => res.dados),
      catchError((error: HttpErrorResponse) => this.processarErroHttp(error))
    );
  }
}
