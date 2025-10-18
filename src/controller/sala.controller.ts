import {Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {CriarUsuarioDto} from "../shared/dto/CriarUsuario.dto";
import {AuthUserDto} from "../shared/dto/AuthUser.dto";
import {UsuarioService} from "../service/usuario/usuario.service";
import {Public} from "../shared/decorators/public-auth.decorator";
import {AuthService} from "../service/auth/auth.service";
import {Response, Request} from 'express';
import { CriarSalaDto } from 'src/shared/dto/CriarSala.dto';
import { SalaService } from 'src/service/sala/sala.service';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {EnviarMensagemDto} from "../shared/dto/EnviarMensagem.dto";

@Controller('rooms')
export class SalaController {
    constructor(
        private readonly salaService: SalaService,
    ) {}

    @ApiOperation({ summary: 'Cria uma nova sala de chat' })
    @ApiResponse({ status: 201, description: 'Sala criada com sucesso' })
    @Post()
    async criarSala(
        @Body() data: CriarSalaDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const loginDoUsuario = req["user"];
        const sala  = await this.salaService.criaSala(data, loginDoUsuario["login"]);
        return res.status(HttpStatus.CREATED).send(sala);
    }

    @ApiOperation({ summary: 'Remove uma sala (apenas pelo dono ou administrador)' })
    @ApiResponse({ status: 200, description: 'Sala deletada com sucesso' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID da sala',
        example: 1,
    })
    @Delete(':id')
    async remover(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.removerSala(id, usuario["login"]);
    }

    @ApiOperation({ summary: 'Adiciona um usuário autenticado a uma sala' })
    @ApiResponse({ status: 200, description: 'Usuário adicionado com sucesso' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID da sala',
        example: 1,
    })
    @Post(':id/enter')
    async entrar(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.entrarSala(id, usuario["login"]);
    }

    @ApiOperation({ summary: 'Remove um usuário autenticado a uma sala' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID da sala',
        example: 1,
    })
    @Post(':id/leave')
    async sair(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.sairSala(id, usuario["login"]);
    }

    @ApiOperation({ summary: 'Remove um usuário específico de uma sala (apenas pelo dono ou administrador)' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    @ApiParam({
        name: 'roomId',
        required: true,
        description: 'ID da sala',
        example: 1,
    })
    @ApiParam({
        name: 'userId',
        required: true,
        description: 'ID do usuário',
        example: 1,
    })
    @Delete(':roomId/users/:userId')
    async removerUsuarioDaSala(
        @Param('roomId') salaId: number,
        @Param('userId') usuarioParaRemoverId: number,
        @Req() req: Request
    ) {
        const usuario = req['user'];
        return this.salaService.removerUsuarioDaSala(salaId, usuarioParaRemoverId,usuario["login"]);
    }

    @ApiOperation({ summary: 'Lista todas as salas ativas' })
    @ApiResponse({ status: 200, description: 'Salas listadas com sucesso' })
    @Get()
    async listarTodas() {
        return this.salaService.listarSalas();
    }

    @ApiOperation({ summary: 'Envia uma mensagem para uma sala de chat' })
    @Post(":roomId/messages")
    @ApiParam({
        name: 'roomId',
        required: true,
        description: 'ID da sala',
        example: 1,
    })
    async enviarMensagemNaSala(
        @Param("roomId") salaId: number,
        @Body() conteudo: EnviarMensagemDto,
        @Req() req: Request,
    ) {
        const nomeDoUsuario = req["user"];
        return this.salaService.enviarMensagemNaSala(salaId, conteudo.conteudo, nomeDoUsuario["login"]);
    }

    @ApiOperation({ summary: 'Recupera o histórico de mensagens de uma sala (com suporte a paginação, se aplicável)' })
    @Get(":roomId/messages")
    @ApiParam({
        name: 'roomId',
        required: true,
        description: 'ID da sala',
        example: 1,
    })
    async buscarMensagemsDaSala(
        @Param("roomId") salaId: number
    ) {
        return this.salaService.buscarMensagemsDaSala(salaId);
    }
}
