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

    public obter(nome: string): Promise<IBaseModel<IProdutoModel[]>> {
        let params = new HttpParams();

        if (nome) {
            params.append('nome', nome);
        }

        return this.httpClient
        .get<IBaseModel<IProdutoModel[]>>(`${this.apiBaseUrl}/produto`, { params })
        .toPromise();
      }
}