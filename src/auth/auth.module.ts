import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EntityModule } from 'src/entity/entity.module';
import { TokenModule } from 'src/token/token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { RefreshStrategy } from './refresh.strategy';

@Module({
  providers: [AuthService, LocalStrategy, RefreshStrategy],
  imports: [EntityModule, PassportModule, TokenModule],
  controllers: [AuthController],
})
export class AuthModule {}
