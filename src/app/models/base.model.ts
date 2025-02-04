import { IEnumModel } from './enum.model';

export interface IBaseModel<T> {
  sucesso: boolean;
  mensagens: IEnumModel[];
  dados: T;
  resultadoValidacao: any;

  pagina: number;
  tamanhoPagina: number;
  totalRegistros: number;
  totalPaginas: number;
}
