import { IEnumModel } from "./enum.model";

export interface IUsuarioModel {
    id: string;
    email: string;
    senha?: string;
    perfilId: number;
    perfil: IEnumModel;
    token?: string;
}