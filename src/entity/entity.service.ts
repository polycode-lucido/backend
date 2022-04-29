import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityDTO } from 'src/entity/entityDTO.model';
import { ConflictError, InvalidArgumentError } from 'src/errors';
import { Entity } from './entity.model';
import { hash } from 'bcrypt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class EntityService {
  constructor(
    @InjectModel(Entity)
    private userModel: typeof Entity,
    private readonly tokenService: TokenService,
  ) {}

  async findByEmail(email: string): Promise<Entity> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  findAll(): Promise<Entity[]> {
    return this.userModel.findAll();
  }

  async create(entity: EntityDTO): Promise<Entity> {
    if (
      !entity.email ||
      !entity.password ||
      !entity.firstname ||
      !entity.lastname
    ) {
      throw new InvalidArgumentError(
        'Email, password, firstname and lastname are required',
      );
    }

    if (entity.password.length < 8) {
      throw new InvalidArgumentError(
        'Password must be at least 8 characters long',
      );
    }

    const user = await this.userModel.findOne({
      where: {
        email: entity.email,
      },
    });

    if (!user) {
      entity.password = await hash(entity.password, 10);
      entity.validated = false;

      const user = await this.userModel.create({ ...entity });

      this.tokenService.create(user);

      return user;
    } else throw new ConflictError('User already exists');
  }
}
