import {Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {CriarUsuarioDto} from "../shared/dto/CriarUsuario.dto";
import {AuthUserDto} from "../shared/dto/AuthUser.dto";
import {UsuarioService} from "../service/usuario/usuario.service";
import {Public} from "../shared/decorators/public-auth.decorator";
import {AuthService} from "../service/auth/auth.service";
import { Response, Request } from 'express';
import { CriarSalaDto } from 'src/shared/dto/CriarSala.dto';
import { SalaService } from 'src/service/sala/sala.service';
import {MensagemService} from "../service/mensagem/mensagem.service";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {EnviarMensagemDto} from "../shared/dto/EnviarMensagem.dto";

@Controller('messages')
export class MensagemController {
    constructor(
        private readonly mensagemService: MensagemService,
    ) {}

    @ApiResponse({ status: 200, description: 'Mensagem criada com sucesso' })
    @ApiParam({
        name: 'receiverId',
        required: true,
        description: 'ID do destinatário',
        example: 1,
    })
    @Post("/direct/:receiverId")
    async enviarMensagemDireta(
        @Param("receiverId") destinatarioId: number,
        @Body() conteudo: EnviarMensagemDto,
        @Req() req: Request
    ) {
        const loginDoUsuario = req["user"];
        return this.mensagemService.enviarMensagemDireta(destinatarioId, loginDoUsuario["login"], conteudo);
    }
}
