import {Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, Req, UseGuards} from '@nestjs/common';
import {CriarUsuarioDto} from "../shared/dto/CriarUsuario.dto";
import {AuthUserDto} from "../shared/dto/AuthUser.dto";
import {UsuarioService} from "../service/usuario/usuario.service";
import {Public} from "../shared/decorators/public-auth.decorator";
import {AuthService} from "../service/auth/auth.service";
import { Response, Request } from 'express';

@Controller('users')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly authService: AuthService,
    ) {}

    @Post()
    async create(@Body() data: CriarUsuarioDto) {
        return this.usuarioService.criaUsuario(data);
    }

    @Get("/me")
    async me(@Req() req: Request, @Res() res: Response) {
        return res.status(HttpStatus.OK).send(req["user"]);
    }


    @Get('/:id')
    buscaPorId(@Param("id") id: number) {
        return this.usuarioService.buscaPorId(id);
    }

    @Public()
    @Post("/login")
    async login(@Res() res: Response, @Body() dto: AuthUserDto): Promise<any> {
        return await this.authService.loginWithCredentials(res, dto.login, dto.senha);
    }
}
