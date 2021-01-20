import { IProdutoPedidoModel } from "./produto-pedido.model";

export interface IPedidoModel {
    id: string;
    emailComprador: string;
    valor: any;
    produtosPedido: IProdutoPedidoModel[]
}