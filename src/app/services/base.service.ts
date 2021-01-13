import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public apiBaseUrl = `${window.location.origin}/api`;

  constructor(public httpClient: HttpClient) { }

  // public handleError(error: HttpErrorResponse) {

  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred
  //     // TODO: Implementar tratativas para erro client-side e de rede


  //   } else {
  //     // Se for um retorno padronizado do backend
  //     if (error.error && error.error.sucesso !== undefined && error.error.mensagem !== undefined) {
  //       return throwError(error.error as IBaseModel<any>);
  //     }
  //   }

  //   // Retorno padrão
  //   return throwError({ sucesso: false, mensagem: { nome: 'ErroInterno', descricao: 'Ocorreu um erro ao tentar realizar a operação' } } as IBaseModel<any>);
  // }
}
