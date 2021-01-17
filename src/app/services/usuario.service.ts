import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBaseModel } from "../models/base.model";
import { IUsuarioModel } from "../models/usuario.model";

import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root',
  })
export class UsuarioService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public listar(): Promise<IBaseModel<IUsuarioModel[]>> {
        return this.httpClient
        .get<IBaseModel<IUsuarioModel[]>>(`${this.apiBaseUrl}/usuario`, { })
        .toPromise();
    }

    public obterPorId(id: string): Promise<IBaseModel<IUsuarioModel>> {
        return this.httpClient
        .get<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario/${id}`, { })
        .toPromise();
    }

    public async inserir(data: IUsuarioModel): Promise<IBaseModel<IUsuarioModel>> {
        return this.httpClient
          .post<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario`, data)
          .toPromise();
    }

    public async atualizar(data: IUsuarioModel): Promise<IBaseModel<IUsuarioModel>> {
        return this.httpClient
          .put<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario/`, data)
          .toPromise();
     }

     public async excluir(data: string): Promise<IBaseModel<IUsuarioModel>> {
        return this.httpClient
          .delete<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario?id=${data}`)
          .toPromise();
     }
}