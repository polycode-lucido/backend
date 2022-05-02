import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EntityModule } from 'src/entity/entity.module';
import { TokenModule } from 'src/token/token.module';
import { AccessStrategy } from './strategies/access.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService, LocalStrategy, RefreshStrategy, AccessStrategy],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EntityModule,
    PassportModule,
    TokenModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
