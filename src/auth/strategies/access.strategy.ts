import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IncomingMessage } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      ignoreExpiration: true,
      algorithms: ['RS512'],
      secretOrKey: process.env['ACCESS_PUBLIC_KEY'],
      passReqToCallback: true,
    });
  }

  async validate(req: IncomingMessage, payload: any) {
    const userId = payload.id;

    return userId;
  }
}
