import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import {AuthService} from "../../service/auth/auth.service";
import {IS_PUBLIC_KEY} from "../decorators/public-auth.decorator";
import {DetalheUsuarioDto} from "../dto/detalheUsuario.dto";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookie(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.authService.checkToken(token);
            const usuario = new DetalheUsuarioDto();
            usuario.nome = payload["login"];
            request["user"] = usuario;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromCookie(request: Request): string | null {
        const cookie = request.headers["cookie"];
        if (cookie) {
            const cookieParts = cookie.split(";");
            let token = null;
            if (Array.isArray(cookieParts)) {
                cookieParts.forEach(cookiePart => {
                    if (cookiePart.includes("jwt-token")) {
                        token = cookiePart.replace("jwt-token=", "").trim();
                    }
                });
                return token;
            }
            return token;
        }
        return null;
    }
}
