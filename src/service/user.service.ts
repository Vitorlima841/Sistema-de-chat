import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../shared/dto/CreateUser.dto";
import {Usuario} from "../model/usuario.entity";

@Injectable()
export class UserService {

    async create(dto: CreateUserDto) {
        const usuario = new Usuario();
        usuario.login = dto.login;
        usuario.senha = dto.senha;
        usuario.nome = dto.nome;
        console.log(usuario);
        return await Usuario.save(usuario);
    }

    login(data: CreateUserDto) {
    }

    findOne(id: number) {
        return this.users.find(u => u.id === id);
    }
}
