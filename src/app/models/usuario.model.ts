import { IEnumModel } from "./enum.model";

export interface IUsuarioModel {
    id: string;
    email: string;
    perfil: IEnumModel;
    senha: string;
    token?: string;
}