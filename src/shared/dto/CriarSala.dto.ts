import { TipoSala } from "../enums/TipoSala.enum";

export class CriarSalaDto{
    nome: string;
    descricao: string;
    tipo: TipoSala;
}