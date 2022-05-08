import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { registerer } from 'src/auth/auth.config';
import { EntityDTO } from 'src/entity/entityDTO.model';
import { NotFoundError } from 'src/errors';
import { EntityToken } from './token.model';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(EntityToken)
    private tokenModel: typeof EntityToken,
    private jwtService: JwtService,
  ) {}

  async create(entity: EntityDTO) {
    const refreshToken = this.jwtService.sign(
      {
        id: entity.id,
      },
      { algorithm: 'RS512', privateKey: process.env['REFRESH_PRIVATE_KEY'] },
    );

    this.tokenModel.create({
      entityId: entity.id,
      hashedRefreshToken: refreshToken,
    });
  }

  async findById(id: string) {
    return this.tokenModel.findByPk(id);
  }

  async createAccessToken(userId: string): Promise<string> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const accessToken = this.jwtService.sign(
      {
        id: userId,
      },
      {
        algorithm: 'RS512',
        privateKey: process.env['ACCSES_PRIVATE_KEY'],
        expiresIn: '30s',
      },
    );

    user.hashedAccessToken = accessToken;
    await user.save();

    return accessToken;
  }
}
