import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";
import {Usuario} from "../model/usuario.entity";
import { Sala } from 'src/model/sala.entity';

@Injectable()
export class SalaUsuarioRepository {
    constructor() {}

    async listarUsuariosDaSala(idSala: number) {
        return this.find({
        where: { id: idSala },
        relations: ['usuario'],
        });
    }

    async listarSalasDoUsuario(idUsuario: number) {
        return this.find({
        where: { usuario: { id: idUsuario } },
        relations: ['sala'],
        });
    }

    async adicionarUsuarioNaSala(sala: any, usuario: any) {
        const relacao = this.create({ sala, usuario });
        return this.save(relacao);
    }

    async removerUsuarioDaSala(idSala: number, idUsuario: number) {
        const relacao = await this.findOne({
        where: { sala: { id: idSala }, usuario: { id: idUsuario } },
        relations: ['usuario', 'sala'],
        });
    }

    if (relacao) {
      await this.remove(relacao);
      return relacao;
    }
    return null;

}
