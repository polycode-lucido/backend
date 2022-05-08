import { randomBytes } from 'crypto';
import { DataTypes } from 'sequelize';
import {
  AllowNull,
  Column,
  Default,
  HasOne,
  IsEmail,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EntityToken } from '../token/token.model';

@Table({
  tableName: 'nest_entity',
  paranoid: true,
})
export class Entity extends Model {
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  declare id: string;

  @IsEmail
  @AllowNull(false)
  @NotNull
  @Column(DataTypes.STRING)
  declare email: any;

  @AllowNull(false)
  @NotNull
  @Column(DataTypes.STRING)
  declare firstname: any;

  @AllowNull(false)
  @NotNull
  @Column(DataTypes.STRING)
  declare lastname: any;

  @AllowNull(false)
  @NotNull
  @Column(DataTypes.STRING)
  declare password: any;

  @AllowNull(false)
  @NotNull
  @Column(DataTypes.STRING)
  declare validation_token: string;

  @Column(DataTypes.STRING)
  declare reset_password_token: string;

  @Default(false)
  @Column(DataTypes.BOOLEAN)
  declare validated: any;

  @HasOne(() => EntityToken, { as: 'tokens' })
  declare tokens: EntityToken;

  newPasswordToken() {
    this.reset_password_token = Entity.generateToken();
    return this.reset_password_token;
  }

  static generateToken() {
    return randomBytes(32).toString('hex');
  }
}
