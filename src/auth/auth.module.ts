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
import { registerer, validationSchema } from './auth.config';

@Module({
  providers: [AuthService, LocalStrategy, RefreshStrategy, AccessStrategy],
  imports: [
    EntityModule,
    PassportModule,
    TokenModule,
    ConfigModule.forRoot({ load: [registerer], validationSchema }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
