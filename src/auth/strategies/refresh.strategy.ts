import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IncomingMessage } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ForbiddenError,
  InvalidArgumentError,
  NotFoundError,
} from 'src/errors';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      ignoreExpiration: true,
      algorithms: ['RS512'],
      secretOrKey: process.env['REFRESH_PUBLIC_KEY'],
      passReqToCallback: true,
    });
  }

  async validate(req: IncomingMessage, payload: any) {
    const userId = payload.id;
    const refreshToken = req.headers.authorization.slice(7);

    if (!userId || !refreshToken) {
      throw new InvalidArgumentError('UserId and refresh token are required');
    }

    const token = await this.tokenService.findById(userId);

    if (!token) throw new NotFoundError('Token not found');

    if (token.hashedRefreshToken !== refreshToken)
      throw new ForbiddenError('Refresh token is invalid');

    return userId;
  }
}
