import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { registerer, validationSchema } from './token.config';
import { EntityToken } from './token.model';
import { TokenService } from './token.service';

@Module({
  imports: [
    SequelizeModule.forFeature([EntityToken]),
    ConfigModule.forRoot({
      load: [registerer],
      validationSchema,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get('token');
        return {
          privateKey: config.accessPrivateKey,
          publicKey: config.accessPublicKey,
          signOptions: config.signOptions,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TokenService],
  providers: [TokenService],
  controllers: [],
})
export class TokenModule {}
