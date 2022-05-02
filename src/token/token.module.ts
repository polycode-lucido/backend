import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { EntityToken } from './token.model';
import { TokenService } from './token.service';

@Module({
  imports: [
    SequelizeModule.forFeature([EntityToken]),
    JwtModule.register({
      privateKey: process.env['ACCESS_PRIVATE_KEY'],
      publicKey: process.env['ACCESS_PUBLIC_KEY'],
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [TokenService],
  providers: [TokenService],
  controllers: [],
})
export class TokenModule {}
