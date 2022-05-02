import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { createDTOFromEntity, EntityDTO } from 'src/entity/entityDTO.model';
import {
  ConflictError,
  ForbiddenError,
  InvalidArgumentError,
  NotFoundError,
} from 'src/errors';
import { TokenService } from 'src/token/token.service';
import { Entity } from './entity.model';
@Injectable()
export class EntityService {
  constructor(
    @InjectModel(Entity)
    private entityModel: typeof Entity,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}

  async findByEmail(email: string): Promise<Entity> {
    const entity = await this.entityModel.findOne({
      where: {
        email,
      },
    });
    if (!entity) {
      throw new NotFoundError('User not found');
    }

    return entity;
  }

  async findById(id: string): Promise<EntityDTO> {
    const entity = await this.entityModel.findByPk(id);
    if (!entity) {
      throw new NotFoundError('Entity not found');
    }

    return createDTOFromEntity(entity);
  }

  findAll(): Promise<Entity[]> {
    return this.entityModel.findAll();
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

    const user = await this.entityModel.findOne({
      where: {
        email: entity.email,
      },
    });

    if (!user) {
      entity.validation_token = Entity.generateToken();
      entity.password = await hash(entity.password, 10);
      entity.validated = false;

      const user = await this.entityModel.create({ ...entity });

      this.tokenService.create(user);
      this.sendVerificationEmail(user);

      return user;
    } else throw new ConflictError('User already exists');
  }

  async sendVerificationEmail(entity: Entity) {
    if (entity.validated) {
      throw new ConflictError('User already validated');
    }

    this.emailService.sendVerificationEmail(
      entity.email,
      entity.firstname,
      entity.validation_token,
    );
  }

  async verifyUser(token: string): Promise<string> {
    if (!token) {
      throw new InvalidArgumentError('Token is required');
    }

    const entity = await this.entityModel.findOne({
      where: {
        validation_token: token,
      },
    });

    if (!entity) {
      throw new NotFoundError('User not found');
    }

    if (entity.validated) {
      throw new InvalidArgumentError('User already validated');
    }

    entity.validated = true;
    await entity.save();
    return entity.id;
  }

  async sendResetPasswordEmail(email: string) {
    if (!email) {
      throw new InvalidArgumentError('Email is required');
    }

    const entity = await this.entityModel.findOne({
      where: {
        email,
      },
    });

    if (!entity) {
      throw new NotFoundError('User not found');
    }

    entity.newPasswordToken();
    await entity.save();

    this.emailService.sendPasswordResetEmail(
      entity.email,
      entity.firstname,
      entity.reset_password_token,
    );
  }
  async resetPassword(token: string, password: string) {
    if (!token) {
      throw new InvalidArgumentError('Token is required');
    }

    if (!password) {
      throw new InvalidArgumentError('Password is required');
    }

    const entity = await this.entityModel.findOne({
      where: {
        reset_password_token: token,
      },
    });

    if (!entity) {
      throw new NotFoundError('User not found');
    }

    if (!entity.validated) {
      throw new ForbiddenError('User not validated');
    }

    entity.password = await hash(password, 10);
    entity.reset_password_token = null;
    await entity.save();
  }
}
