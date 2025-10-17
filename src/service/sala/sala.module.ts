import { Module } from '@nestjs/common';
import {SalaService} from "./sala.service";
import {SalaRepository} from "../../repository/sala.repository";
import {SalaController} from "../../controller/sala.controller";
import {UsuarioModule} from "../usuario/usuario.module";
import {SalaUsuarioRepository} from "../../repository/salaUsuario.repository";

@Module({
    imports: [UsuarioModule, SalaUsuarioRepository],
    providers: [SalaService, SalaRepository],
    exports: [SalaService, SalaRepository],
    controllers: [SalaController],
})
export class SalaModule {}
