import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Md5 } from "ts-md5";
import { IBaseModel } from "../models/base.model";
import { IEnumModel } from "../models/enum.model";
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

    public listarPerfis(): Promise<IBaseModel<IEnumModel[]>> {
      return this.httpClient
      .get<IBaseModel<IEnumModel[]>>(`${this.apiBaseUrl}/usuario/perfis`, { })
      .toPromise();
  }

    public obterPorId(id: string): Promise<IBaseModel<IUsuarioModel>> {
        return this.httpClient
        .get<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario/${id}`, { })
        .toPromise();
    }

    public async inserir(data: IUsuarioModel): Promise<IBaseModel<IUsuarioModel>> {
      data.senha = Md5.hashStr(data.senha).toString().toUpperCase();
      return this.httpClient
        .post<IBaseModel<IUsuarioModel>>(`${this.apiBaseUrl}/usuario`, data)
        .toPromise();
    }

    public async atualizar(data: IUsuarioModel): Promise<IBaseModel<IUsuarioModel>> {
      data.senha = Md5.hashStr(data.senha).toString().toUpperCase();
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