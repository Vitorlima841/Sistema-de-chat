import { forwardRef, Module } from '@nestjs/common';
import {MensagemService} from "./mensagem.service";
import {MensagemRepository} from "../../repository/mensagem.repository";
import {MensagemController} from "../../controller/mensagem.controller";
import {MensagemGeteway} from "../../controller/mensagem.geteway";
import {UsuarioService} from "../usuario/usuario.service";
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
    imports: [UsuarioModule],
    providers: [MensagemService, MensagemRepository, MensagemGeteway],
    exports: [MensagemService, MensagemRepository],
    controllers: [MensagemController],
})
export class MensagemModule {}
