import {ApiProperty} from "@nestjs/swagger";

export class EnviarMensagemDto {
    @ApiProperty({ example: 'Mensagem padrão' })
    conteudo: string;
}