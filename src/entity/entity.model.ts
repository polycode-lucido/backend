import { DataTypes } from 'sequelize';
import {
  Column,
  Default,
  HasOne,
  IsEmail,
  Model,
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
  id: string;

  @IsEmail
  @Column(DataTypes.STRING)
  email: any;

  @Column(DataTypes.STRING)
  firstname: any;

  @Column(DataTypes.STRING)
  lastname: any;

  @Column(DataTypes.STRING)
  password: any;

  @Default(false)
  @Column(DataTypes.BOOLEAN)
  validated: any;

  @HasOne(() => EntityToken, { as: 'tokens' })
  tokens: EntityToken;
}
