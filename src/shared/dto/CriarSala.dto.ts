import { TipoSala } from "../enums/TipoSala.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CriarSalaDto{
    @ApiProperty({ example: 'Nome Da Sala' })
    nomeDaSala: string;
    @ApiProperty({ example: 'Descrição Da Sala' })
    descricao: string;
    @ApiProperty({ example: TipoSala.PUBLICA })
    tipo: TipoSala;
}