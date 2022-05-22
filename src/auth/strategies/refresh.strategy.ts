import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IncomingMessage } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ForbiddenError,
  InvalidArgumentError,
  NotFoundError,
} from 'src/errors';
import { TokenService } from 'src/token/token.service';
import { registerer } from '../auth.config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly tokenService: TokenService,
    @Inject(registerer.KEY) private authConfig: ConfigType<typeof registerer>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      ignoreExpiration: true,
      algorithms: ['RS512'],
      secretOrKey: `-----BEGIN PUBLIC KEY-----
      MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB51/cNINZop9YWYbPLc9y0
      SXZdfEa+a7EwgAU/DWAXnas3r6tbqfGAlMJXAkvWeIN2f/KLrpV3ZgONffycpWCo
      +NQZE9NUUmdxrtiLzqbTSNYFAAnLUKU0uJo2lY0ntSMNhx9/8+C2YUwRNUVnIZ4A
      SdPOOC06pT5t25Xvzk8vpsNy3E5fGoRQaxwenD4/dMHmuxg+lwyMof2g2JadMrAz
      x28lgwe3yTbseGvh/EeJ4fyWO/+H63NInnNXZp7fq+DcFgcGVWgacf8dNjc9KaGJ
      QeJbj9qogge/uXyVaUlMF3Z2Q5rxpwfJ5gGJgxeJ2zSwrXRxGT1UBRuWzL9aeVr5
      AgMBAAE=
      -----END PUBLIC KEY-----`,
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
