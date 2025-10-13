import {DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {config} from "../omrconfig";
import { JwtModule } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";
import { HttpModule } from "@nestjs/axios";
import {APP_GUARD} from "@nestjs/core";

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(config);
}

@Module({
  imports: [
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
    DatabaseOrmModule()
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // }
  ],
})
export class AppModule {}
