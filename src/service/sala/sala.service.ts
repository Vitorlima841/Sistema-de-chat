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
import {Mensagem} from "../../model/mensagem.entity";

@Injectable()
export class SalaService {
    constructor(
       private readonly salaRepository: SalaRepository,
       private readonly usuarioService: UsuarioService,
       private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async criaSala(dto: CriarSalaDto, loginDoUsuario: string) {
        const usuario = await this.usuarioService.buscaPorLogin(loginDoUsuario);
        const sala = new Sala();
        sala.nome = dto.nomeDaSala;
        sala.descricao = dto.descricao;
        sala.tipo = dto.tipo;
        const salaSalva = await this.salaRepository.salvaSala(sala);

        const salaUsuario = new SalaUsuario();
        salaUsuario.cargo = TipoUsuario.DONO;
        salaUsuario.sala = salaSalva.id;
        salaUsuario.usuario = usuario.id;
        await SalaUsuario.save(salaUsuario);
        return salaSalva;
    }

    async listarSalas() {
        return this.salaRepository.listarSalas();
    }

    async entrarSala(salaId: number, loginUsuario: string) {
        const sala = await this.buscaSalaPorId(salaId);
        if (!sala) throw new NotFoundException('Sala não encontrada.');

        const usuario = await this.usuarioService.buscaPorLogin(loginUsuario);
        if (!usuario) throw new BadRequestException('Usuário inválido.');

        const jaEstaNaSala = await SalaUsuario.findOne({
            where: {sala: salaId, usuario: usuario.id}
        });
        if (jaEstaNaSala) throw new BadRequestException('Usuário já está participando desta sala.');

        const rl = new SalaUsuario();
        rl.cargo = TipoUsuario.MEMBRO;
        rl.sala = sala.id;
        rl.usuario = usuario.id;

        await SalaUsuario.save(rl);
        return { mensagem: `Usuário ${usuario.nome} entrou na sala ${sala.nome}.` };
    }

    async sairSala(salaId: number, loginUsuario: string) {
        const usuario = await this.usuarioService.buscaPorLogin(loginUsuario);
        if (!usuario) throw new BadRequestException('Usuário inválido.');

        const relacao = await SalaUsuario.findOne({
            where: {sala: salaId, usuario: usuario.id}
        })

        if (!relacao) throw new NotFoundException('Usuário não está nesta sala.');

        return await SalaUsuario.remove(relacao);
    }

    async removerSala(idSala: number, loginUsuario: any) {
        const sala = await this.salaRepository.buscaSalaPorId(idSala);
        const usuario: Usuario = await this.usuarioService.buscaPorLogin(loginUsuario);
        if (!sala) throw new NotFoundException('Sala não encontrada.');

        await this.validaPermicaoRemoverSala(sala, usuario)
        const rlsSalaUsuario = await this.salaRepository.buscaTodasRls(sala)
        await this.salaRepository.removeRls(sala, rlsSalaUsuario);
        return { mensagem: `Sala '${sala.nome}' removida com sucesso.` };
    }

    async removerUsuarioDaSala(salaId: number, usuarioParaRemoverId: number, loginUsuario: string) {
        const sala = await this.salaRepository.buscaSalaPorId(salaId);
        const usuario: Usuario = await this.usuarioService.buscaPorLogin(loginUsuario);
        if (!sala) {
            throw new NotFoundException('Sala não encontrada.');
        }

        await this.validaPermicaoRemoverUsuario(sala, usuario)
        const rlsSalaUsuario = await this.salaRepository.buscaRlDoUsuario(sala, usuarioParaRemoverId)

        await this.salaRepository.removeRl(rlsSalaUsuario);
        return { mensagem: `Sala '${sala.nome}' removida com sucesso.` };
    }

    async validaPermicaoRemoverSala(sala: Sala, usuario: Usuario) {
        await this.salaRepository.validaPermicaoRemoverSala(sala, usuario)
    }

    async validaPermicaoRemoverUsuario(sala: Sala, usuario: Usuario) {
        await this.salaRepository.validaPermicaoRemoverUsuario(sala, usuario)
    }

    // async listarMinhasSalas(usuarioToken: any) {
    //     const relacoes = await SalaUsuario.find({
    //     where: { usuario: { id: usuarioToken.id } },
    //     relations: ['sala'],
    //     });
    //     return relacoes.map((r) => r.sala);
    // }

    async buscaSalaPorId(salaId: number): Promise<Sala>{
        return await Sala.findOne({
            where: { id: salaId }
        })
    }

    async enviarMensagemNaSala(salaId: number, conteudo: string, loginUsuario: string) {
        const remetente: Usuario = await this.usuarioService.buscaPorLogin(loginUsuario);
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
