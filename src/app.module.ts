import {DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {config} from "../ormconfig";
import { JwtModule } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

export function DatabaseOrmModule(): DynamicModule {
  return TypeOrmModule.forRoot(config);
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseOrmModule(),
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
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // }
  ],
})
export class AppModule {}
