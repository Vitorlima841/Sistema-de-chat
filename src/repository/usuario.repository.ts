import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";
import {Usuario} from "../model/usuario.entity";

@Injectable()
export class UsuarioRepository {
    constructor() {}

    async salvaUsuario(usuario: Usuario): Promise<Usuario> {
        return await Usuario.save(usuario);
    }

    async buscaPorId(id: number): Promise<Usuario> {
        const usuario = await Usuario.findOne({
            where: { id: id }
        });
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        return usuario;
    }

    async buscaPorLogin(login: string): Promise<Usuario> {
        const usuario = await Usuario.findOne({
            where: { login: login }
        });
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        return usuario;
    }
}
