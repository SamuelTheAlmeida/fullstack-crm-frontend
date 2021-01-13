import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IBaseModel } from 'src/app/models/base.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    //const authService = this.injector.get(AuthService);

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          // window.location.replace('/conta/login?returnUrl=' + window.location);
          return next.handle(null);
        }

        if (error.status === 403) {
          return throwError({ sucesso: false, mensagem: { nome: 'Acesso Negado!', descricao: 'Você não possui acesso a esse recurso.' } } as IBaseModel<any>);
        }

        // return throwError(error);

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred

        } else {
          // Se for um retorno padronizado do backend
          if (error.error && error.error.sucesso !== undefined && error.error.mensagem !== undefined) {
            return throwError(error.error as IBaseModel<any>);
          }
        }

        // Retorno padrão
        return throwError({ sucesso: false, mensagem: { nome: 'ErroInterno', descricao: 'Ocorreu um erro ao tentar realizar a operação' } } as IBaseModel<any>);
      }));
  }
}
