import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Usuario} from "../../model/usuario.entity";
import {UsuarioController} from "../../controller/usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioRepository} from "../../repository/usuario.repository";
import {AuthModule} from "../auth/auth.moule";

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        forwardRef(() => AuthModule),
    ],
    providers: [UsuarioService, UsuarioRepository],
    exports: [UsuarioService, UsuarioRepository],
    controllers: [UsuarioController],
})
export class UsuarioModule {}
