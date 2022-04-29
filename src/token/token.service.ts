import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { EntityDTO } from 'src/entity/entityDTO.model';
import { NotFoundError } from 'src/errors';
import { accessPrivateKey, refreshPrivateKey } from 'src/secrets';
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
      { algorithm: 'RS512', privateKey: refreshPrivateKey },
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
      { algorithm: 'RS512', privateKey: accessPrivateKey },
    );

    user.hashedAccessToken = accessToken;
    await user.save();

    return accessToken;
  }
}
