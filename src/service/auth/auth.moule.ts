import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
    ],
    controllers: [],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
