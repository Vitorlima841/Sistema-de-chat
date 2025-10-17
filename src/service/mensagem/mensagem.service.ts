import { Injectable } from '@nestjs/common';
import {Usuario} from "../../model/usuario.entity";
import {UsuarioRepository} from "../../repository/usuario.repository";
import {CriarUsuarioDto} from "../../shared/dto/CriarUsuario.dto";
import {MensagemRepository} from "../../repository/mensagem.repository";
import {Mensagem} from "../../model/mensagem.entity";
import {UsuarioService} from "../usuario/usuario.service";
import {MensagemGeteway} from "../../controller/mensagem.geteway";


@Injectable()
export class MensagemService {
    constructor(
        private readonly mensagemRepository: MensagemRepository,
        private readonly usuarioService: UsuarioService,
        private readonly gateway: MensagemGeteway
    ) {}

    async enviarMensagemDireta(destinatarioId: number, nomeDoUsuario: any, conteudo: string) {
        const destinatario: Usuario = await this.usuarioService.buscaPorId(destinatarioId);
        const remetente: Usuario = await this.usuarioService.buscaPorLogin(nomeDoUsuario);

        const mensagem = new Mensagem();
        mensagem.destinatario = destinatario;
        mensagem.remetente = remetente;
        mensagem.conteudo = conteudo;

        await this.mensagemRepository.salvaMensagem(mensagem);

        this.gateway.enviaMensagemDireta(destinatarioId, conteudo);
    }
}
