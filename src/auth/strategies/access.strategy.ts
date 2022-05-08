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
      secretOrKey: authConfig.accessPublicKey,
      passReqToCallback: true,
    });
  }

  async validate(req: IncomingMessage, payload: any) {
    const userId = payload.id;

    return userId;
  }
}
