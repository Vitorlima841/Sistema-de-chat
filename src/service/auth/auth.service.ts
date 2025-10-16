import {Inject, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsuarioService} from "../usuario/usuario.service";
import { Response } from 'express';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private jwtService: JwtService
    ) {}

    async validaUsuario(login: string, senha: string) {
        const usuario = await this.usuarioService.buscaPorLogin(login);
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const senhaValida = this.usuarioService.validaSenha(usuario, senha);
        if (!senhaValida) {
            throw new Error("Senha inválida");
        }
        return usuario;
    }

    async loginWithCredentials(res: Response, nome: string, senha: string) {
        const usuario = await this.validaUsuario(nome, senha);
        const payload = { id: usuario.id, login: usuario.login };
        const jwt = this.jwtService.sign(payload);

        await this.cacheManager.set(usuario.login, usuario.senha);
        res.cookie("jwt-token", jwt, {
            path: "/",
            secure: false,
            httpOnly: true,
            sameSite: "lax",
        });
        return res.status(200).send({
            token: jwt,
        });
    }

    async checkToken(token: string) {
        try {
            return this.jwtService.verify(token.replace("Bearer ", ""));
        } catch (err) {
            throw err;
        }
    }
}
