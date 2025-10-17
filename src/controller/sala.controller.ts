import {Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {CriarUsuarioDto} from "../shared/dto/CriarUsuario.dto";
import {AuthUserDto} from "../shared/dto/AuthUser.dto";
import {UsuarioService} from "../service/usuario/usuario.service";
import {Public} from "../shared/decorators/public-auth.decorator";
import {AuthService} from "../service/auth/auth.service";
import { Response, Request } from 'express';
import { CriarSalaDto } from 'src/shared/dto/CriarSala.dto';
import { SalaService } from 'src/service/sala/sala.service';

@Controller('sala')
export class SalaController {
    constructor(
        private readonly salaService: SalaService,
    ) {}

    @Post()
    async criarSala(@Body() data: CriarSalaDto) {
        const nomeDoUsuario = res.status(HttpStatus.OK).send(req["user"]);
        return this.salaService.criaSala(data, nomeDoUsuario);
    }

    @Get()
    async listarTodas() {
        return this.salaService.listarSalas();
    }

    @Get('minhas')
    async listarMinhas(@Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.listarMinhasSalas(usuario);
    }

    @Post(':id/entrar')
    async entrar(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.entrarSala(id, usuario);
    }

    @Post(':id/sair')
    async sair(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.sairSala(id, usuario);
    }

    @Delete(':id')
    async remover(@Param('id') id: number, @Req() req: Request) {
        const usuario = req['user'];
        return this.salaService.removerSala(id, usuario);
    }
}
