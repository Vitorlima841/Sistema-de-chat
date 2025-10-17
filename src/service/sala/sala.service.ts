import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import {Usuario} from "../../model/usuario.entity";
import {UsuarioRepository} from "../../repository/usuario.repository";
import {CriarUsuarioDto} from "../../shared/dto/CriarUsuario.dto";
import { Sala } from 'src/model/sala.entity';
import { CriarSalaDto } from 'src/shared/dto/CriarSala.dto';
import { SalaRepository } from 'src/repository/sala.repository';
import { SalaUsuario } from 'src/model/salaUsuario.entity';
import { TipoUsuario } from 'src/shared/enums/TipoUsuario';
import { UsuarioService } from '../usuario/usuario.service';
import { SalaUsuarioRepository } from 'src/repository/salaUsuario.repository';
import {Mensagem} from "../../model/mensagem.entity";

@Injectable()
export class SalaService {
    constructor(
       private readonly salaRepository: SalaRepository,
       private readonly usuarioService: UsuarioService,
       private readonly usuarioRepository: UsuarioRepository,
       private readonly salaUsuarioRepository: SalaUsuarioRepository,
    ) {}

    async criaSala(dto: CriarSalaDto, nomeDoUsuario: any) {
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

    async listarSalas() {
        return this.salaRepository.listarSalas();
    }

    async entrarSala(idSala: number, usuarioToken: any) {
        const sala = await Sala.findOne({
        where: { id: idSala },
        });

        if (!sala) throw new NotFoundException('Sala não encontrada.');

        const usuario = await Usuario.findOne({
        where: { id: usuarioToken.id },
        });

        if (!usuario) throw new BadRequestException('Usuário inválido.');

        const jaEstaNaSala = await this.salaUsuarioRepository.findOne({
        where: { sala: { id: idSala }, usuario: { id: usuario.id } },
        });

        if (jaEstaNaSala)
        throw new BadRequestException('Usuário já está participando desta sala.');

        const novaRelacao = this.salaUsuarioRepository.create({sala,usuario,});

        await this.salaUsuarioRepository.save(novaRelacao);
        return { mensagem: `Usuário ${usuario.nome} entrou na sala ${sala.nome}.` };
    }

    async sairSala(idSala: number, usuarioToken: any) {
        const relacao = await this.salaUsuarioRepository.findOne({
        where: { sala: { id: idSala }, usuario: { id: usuarioToken.id } },
        relations: ['sala', 'usuario'],
        });

        if (!relacao)
            throw new NotFoundException('Usuário não está nesta sala.');

        await SalaUsuario.remove(relacao);
        return { mensagem: `Usuário ${relacao.usuario.nome} saiu da sala ${relacao.sala.nome}.` };
    }

    async removerSala(idSala: number, usuarioToken: any) {
        const sala = await this.salaRepository.findOne(idSala);
        if (!sala) throw new NotFoundException('Sala não encontrada.');

        //todo criar a validação
        // if (sala.dono.id !== usuarioToken.id)
        //     throw new ForbiddenException('Apenas o dono da sala pode removê-la.');

        await this.salaRepository.remove(sala);
        return { mensagem: `Sala '${sala.nome}' removida com sucesso.` };
    }

    async listarMinhasSalas(usuarioToken: any) {
        const relacoes = await SalaUsuario.find({
        where: { usuario: { id: usuarioToken.id } },
        relations: ['sala'],
        });
        return relacoes.map((r) => r.sala);
    }

    async buscaSalaPorId(salaId: number): Promise<Sala>{
        return await Sala.findOne({
            where: { id: salaId }
        })
    }

    async enviarMensagemNaSala(salaId: number, conteudo: string, nomeDoUsuario: any) {
        const remetente: Usuario = await this.usuarioService.buscaPorLogin(nomeDoUsuario);
        const sala: Sala = await this.buscaSalaPorId(salaId);
        const mensagem = new Mensagem();
        mensagem.remetente = remetente;
        mensagem.conteudo = conteudo;
        mensagem.sala = sala;

        await Mensagem.save(mensagem);

        //todo conexção com o web socket
    }

    async buscarMensagemsDaSala(salaId: number){
        return await this.salaRepository.buscarMensagemsDaSala(salaId);
    }
}
