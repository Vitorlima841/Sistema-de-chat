import {Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {CriarUsuarioDto} from "../shared/dto/CriarUsuario.dto";
import {AuthUserDto} from "../shared/dto/AuthUser.dto";
import {UsuarioService} from "../service/usuario/usuario.service";
import {Public} from "../shared/decorators/public-auth.decorator";
import {AuthService} from "../service/auth/auth.service";
import {Response, Request} from 'express';
import { CriarSalaDto } from 'src/shared/dto/CriarSala.dto';
import { SalaService } from 'src/service/sala/sala.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('rooms')
export class SalaController {
    constructor(
        private readonly salaService: SalaService,
    ) {}

    @ApiOperation({ summary: 'Cria uma nova sala de chat' })
    @ApiResponse({ status: 200, description: 'Sala criada com sucesso' })
    @Post()
    async criarSala(
        @Body() data: CriarSalaDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const nomeDoUsuario = req["user"];
        const sala  = await this.salaService.criaSala(data, nomeDoUsuario["nome"]);
        return res.status(HttpStatus.CREATED).send(sala);
    }

    @ApiOperation({ summary: 'Remove uma sala (apenas pelo dono ou administrador)' })
    @ApiResponse({ status: 200, description: 'Sala deletada com sucesso' })
    @Delete(':id')
    async remover(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.removerSala(id, usuario);
    }

    @ApiOperation({ summary: 'Adiciona um usuário autenticado a uma sala' })
    @ApiResponse({ status: 200, description: 'Usuário adicionado com sucesso' })
    @Post(':id/enter')
    async entrar(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.entrarSala(id, usuario);
    }

    // @ApiOperation({ summary: 'Remove um usuário autenticado de uma sala' })
    // @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    // @Post(':id/leave')
    // async sair(@Param('id') id: number, @Req() req: Request) {
    //     const usuario = req['user'];
    //     return this.salaService.sairSala(id, usuario);
    // }

    @ApiOperation({ summary: 'Remove um usuário específico de uma sala (apenas pelo dono ou administrador).' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    @Delete(':roomId/users/:userId')
    async removerUsuarioDaSala(
        @Param('roomId') salaId: number,
        @Param('userId') usuarioParaRemoverId: number,
        @Req() req: Request
    ) {
        const usuario = req['user'];
        return this.salaService.removerUsuarioDaSala(salaId, usuarioParaRemoverId,usuario["nome"]);
    }

    @ApiOperation({ summary: 'Lista todas as salas ativas' })
    @ApiResponse({ status: 200, description: 'Salas listadas com sucesso' })
    @Get()
    async listarTodas() {
        return this.salaService.listarSalas();
    }

    @Post("/rooms/:roomId/messages")
    async enviarMensagemNaSala(
        @Param("roomId") salaId: number,
        @Body() conteudo: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const nomeDoUsuario = req["user"];
        return this.salaService.enviarMensagemNaSala(salaId, conteudo, nomeDoUsuario["nome"]);
    }

    @Get("/rooms/:roomId/messages")
    async buscarMensagemsDaSala(
        @Param("roomId") salaId: number
    ) {
        return this.salaService.buscarMensagemsDaSala(salaId);
    }
}
