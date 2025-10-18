import {ApiProperty} from "@nestjs/swagger";

export class CriarUsuarioDto{
    @ApiProperty({ example: 'NomeUsuario' })
    nome: string;
    @ApiProperty({ example: 'LoginDoUsuario' })
    login: string;
    @ApiProperty({ example: 'SenhaDoUsuario' })
    senha: string;
}