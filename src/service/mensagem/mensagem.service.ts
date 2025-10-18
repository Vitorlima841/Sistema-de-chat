import { Injectable } from '@nestjs/common';
import {Usuario} from "../../model/usuario.entity";
import {UsuarioRepository} from "../../repository/usuario.repository";
import {CriarUsuarioDto} from "../../shared/dto/CriarUsuario.dto";
import {MensagemRepository} from "../../repository/mensagem.repository";
import {Mensagem} from "../../model/mensagem.entity";
import {UsuarioService} from "../usuario/usuario.service";
import {MensagemGeteway} from "../../controller/mensagem.geteway";
import {EnviarMensagemDto} from "../../shared/dto/EnviarMensagem.dto";


@Injectable()
export class MensagemService {
    constructor(
        private readonly mensagemRepository: MensagemRepository,
        private readonly usuarioService: UsuarioService,
        private readonly gateway: MensagemGeteway
    ) {}

    async enviarMensagemDireta(destinatarioId: number, loginDoUsuario: string, enviarMensagem: EnviarMensagemDto) {
        const destinatario: Usuario = await this.usuarioService.buscaPorId(destinatarioId);
        const remetente: Usuario = await this.usuarioService.buscaPorLogin(loginDoUsuario);

        const mensagem = new Mensagem();
        mensagem.destinatario = destinatario;
        mensagem.remetente = remetente;
        mensagem.conteudo = enviarMensagem.conteudo;

        await this.mensagemRepository.salvaMensagem(mensagem);

        // this.gateway.enviaMensagemDireta(destinatarioId, enviarMensagem.conteudo);
    }
}
