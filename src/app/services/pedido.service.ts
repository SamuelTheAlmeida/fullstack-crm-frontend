import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBaseModel } from "../models/base.model";
import { IPedidoModel } from "../models/pedido.model";

import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root',
  })
export class PedidoService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public listar(nome: string): Promise<IBaseModel<IPedidoModel[]>> {
        let params = new HttpParams();

        if (nome) {
            params.append('nome', nome);
        }

        return this.httpClient
        .get<IBaseModel<IPedidoModel[]>>(`${this.apiBaseUrl}/pedido`, { params })
        .toPromise();
    }

    public obterPorId(id: string): Promise<IBaseModel<IPedidoModel>> {
        return this.httpClient
        .get<IBaseModel<IPedidoModel>>(`${this.apiBaseUrl}/pedido/${id}`, { })
        .toPromise();
    }

    public async inserir(data: IPedidoModel): Promise<IBaseModel<IPedidoModel>> {
        return this.httpClient
          .post<IBaseModel<IPedidoModel>>(`${this.apiBaseUrl}/pedido`, data)
          .toPromise();
    }

    public async atualizar(data: IPedidoModel): Promise<IBaseModel<IPedidoModel>> {
        return this.httpClient
          .put<IBaseModel<IPedidoModel>>(`${this.apiBaseUrl}/pedido/`, data)
          .toPromise();
     }

     public async excluir(data: string): Promise<IBaseModel<IPedidoModel>> {
        return this.httpClient
          .delete<IBaseModel<IPedidoModel>>(`${this.apiBaseUrl}/pedido?id=${data}`)
          .toPromise();
     }
}