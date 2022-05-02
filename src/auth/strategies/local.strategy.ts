import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { TokenService } from 'src/token/token.service';
import { HTTPErrorHandler, NotFoundError } from 'src/errors';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const entity = await this.authService.checkPassword(username, password);

      const token = await this.tokenService.findById(entity.id);
      if (!token) {
        throw new NotFoundError('Token not found');
      }

      return { refreshToken: token.hashedRefreshToken };
    } catch (err) {
      HTTPErrorHandler(err);
    }
  }
}
