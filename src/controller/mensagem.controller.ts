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

@Controller('messages')
export class MensagemController {
    constructor(
        private readonly mensagemService: MensagemService,
    ) {}

    @Post("/direct/:receiverId")
    async enviarMensagemDireta(
        @Param("receiverId") destinatarioId: number,
        @Body() conteudo: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const nomeDoUsuario = res.status(HttpStatus.OK).send(req["user"]);
        return this.mensagemService.enviarMensagemDireta(destinatarioId, nomeDoUsuario, conteudo);
    }
}
