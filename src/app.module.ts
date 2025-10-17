import {DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {config} from "../ormconfig";
import { JwtModule } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import {UsuarioModule} from "./service/usuario/usuario.module";
import {AuthModule} from "./service/auth/auth.moule";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./shared/guard/jwt-auth.guard";
import {MensagemModule} from "./service/mensagem/mensagem.module";
import {SalaModule} from "./service/sala/sala.module";

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(config);
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseOrmModule(),
    UsuarioModule,
    AuthModule,
    MensagemModule,
    SalaModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 86400,
      max: 150,
    }),
    JwtModule.register({
      global: true,
      secret: 'Secret',
      signOptions: { expiresIn: '1d'},
    }),
    HttpModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
