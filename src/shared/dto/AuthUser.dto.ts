import {ApiProperty} from "@nestjs/swagger";

export class AuthUserDto{
    @ApiProperty({ example: 'LoginDoUsuario' })
    login: string;
    @ApiProperty({ example: 'SenhaDoUsuario' })
    senha: string;
}