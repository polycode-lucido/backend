import { Injectable } from '@nestjs/common';
import { EntityService } from '../entity/entity.service';
import { compare } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { ForbiddenError, NotFoundError } from 'src/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly entityService: EntityService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.entityService.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    } else if (!user.validated) {
      throw new ForbiddenError('User not validated');
    } else if (!(await compare(password, user.password))) {
      throw new ForbiddenError('Invalid password');
    }
    delete user.password;
    return user;
  }

  async newAccessToken(userId: string): Promise<string> {
    const token = await this.tokenService.createAccessToken(userId);
    return token;
  }
}
