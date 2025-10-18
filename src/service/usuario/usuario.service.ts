import { Injectable } from '@nestjs/common';
import {Usuario} from "../../model/usuario.entity";
import {UsuarioRepository} from "../../repository/usuario.repository";
import {CriarUsuarioDto} from "../../shared/dto/CriarUsuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
       private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async criaUsuario(dto: CriarUsuarioDto) {
        const usuario = new Usuario();
        usuario.login = dto.login;
        usuario.senha = dto.senha;
        usuario.nome = dto.nome;
        return await this.usuarioRepository.salvaUsuario(usuario);
    }

    buscaPorId(id: number) {
        return this.usuarioRepository.buscaPorId(id);
    }

    buscaPorNome(nome: string) {
        return this.usuarioRepository.buscaPorNome(nome);
    }

    buscaPorLogin(login: string) {
        return this.usuarioRepository.buscaPorLogin(login);
    }

    validaSenha(usuario: Usuario, senha: string) {
        return usuario.senha === senha;
    }
}
