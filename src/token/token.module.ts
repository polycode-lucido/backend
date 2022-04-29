import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { accessPrivateKey, accessPublicKey } from 'src/secrets';
import { EntityToken } from './token.model';
import { TokenService } from './token.service';

@Module({
  imports: [
    SequelizeModule.forFeature([EntityToken]),
    JwtModule.register({
      privateKey: accessPrivateKey,
      publicKey: accessPublicKey,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [TokenService],
  providers: [TokenService],
  controllers: [],
})
export class TokenModule {}
