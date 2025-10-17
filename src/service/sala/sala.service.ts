import { Injectable } from '@nestjs/common';
import {Usuario} from "../../model/usuario.entity";
import {UsuarioRepository} from "../../repository/usuario.repository";
import {CriarUsuarioDto} from "../../shared/dto/CriarUsuario.dto";
import { Sala } from 'src/model/sala.entity';
import { CriarSalaDto } from 'src/shared/dto/CriarSala.dto';
import { SalaRepository } from 'src/repository/sala.repository';
import { SalaUsuario } from 'src/model/salaUsuario.entity';
import { TipoUsuario } from 'src/shared/enums/TipoUsuario';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SalaService {
    constructor(
       private readonly salaRepository: SalaRepository,
       private readonly usuarioService: UsuarioService,
    ) {}

    async criaSala(dto: CriarSalaDto, nomeDoUsuario: string) {
        const usuario = await this.usuarioService.buscaPorLogin(nomeDoUsuario);
        const sala = new Sala();
        sala.nome = dto.nome;
        sala.descricao = dto.descricao;
        sala.tipo = dto.tipo;
        const salaSalva = await this.salaRepository.salvaSala(sala);

        const salaUsuario = new SalaUsuario();
        salaUsuario.cargo = TipoUsuario.DONO;
        salaUsuario.sala = salaSalva;
        salaUsuario.usuario = usuario;
        await SalaUsuario.save(salaUsuario);
        return salaSalva;
    }

}
