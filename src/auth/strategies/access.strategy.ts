import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IncomingMessage } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from 'src/token/token.service';
import { registerer } from '../auth.config';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    private readonly tokenService: TokenService,
    @Inject(registerer.KEY) private authConfig: ConfigType<typeof registerer>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      ignoreExpiration: true,
      algorithms: ['RS512'],
      secretOrKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjTHrYO+iGAg4ii4R62AR/Pm96L8LHGoK0e1mXsBiXPnAy5KYrLdq7OpZntwDrg3X0CtGo1JCp1V/nBlfu4pGBUs232yChnLNyi+ib6H8yi2lbE2w+vgt8V13Gg6CsedwWv5ObEum6OcfiV9rUMyfEYAlzdxaRM5NL3Ofkm9mKA/Xn2QGz1xzf53b5NcfEaCfV1c4F4Vqq9tFL4K2hO5gyIIhOwrMTDq6txTEOsuym0sz4kAwRZoveGgk3b/BmRSm1hTaGtbbEGpGD+I9PKQF8NnS2sYqOPzSFreXkB3hnrXcxonInSljpxNCOVGIM7mtgje4BnoWtfGQU8QouP/qLQIDAQAB
-----END PUBLIC KEY-----`,
      passReqToCallback: true,
    });
  }

  async validate(req: IncomingMessage, payload: any) {
    const userId = payload.id;

    return userId;
  }
}
