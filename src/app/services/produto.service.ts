import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBaseModel } from "../models/base.model";
import { IProdutoModel } from "../models/produto.model";

import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root',
  })
export class ProdutoService extends BaseService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public listar(nome: string): Promise<IBaseModel<IProdutoModel[]>> {
        return this.httpClient
        .get<IBaseModel<IProdutoModel[]>>(`${this.apiBaseUrl}/produtos?nome=${nome || ''}`, )
        .toPromise();
    }

    public obterPorId(id: string): Promise<IBaseModel<IProdutoModel>> {
        return this.httpClient
        .get<IBaseModel<IProdutoModel>>(`${this.apiBaseUrl}/produtos/${id}`, { })
        .toPromise();
    }

    public async inserir(data: IProdutoModel): Promise<IBaseModel<IProdutoModel>> {
        return this.httpClient
          .post<IBaseModel<IProdutoModel>>(`${this.apiBaseUrl}/produtos`, data)
          .toPromise();
    }

    public async atualizar(data: IProdutoModel): Promise<IBaseModel<IProdutoModel>> {
        return this.httpClient
          .put<IBaseModel<IProdutoModel>>(`${this.apiBaseUrl}/produtos/`, data)
          .toPromise();
     }

     public async excluir(data: string): Promise<IBaseModel<IProdutoModel>> {
        return this.httpClient
          .delete<IBaseModel<IProdutoModel>>(`${this.apiBaseUrl}/produtos?id=${data}`)
          .toPromise();
     }
}