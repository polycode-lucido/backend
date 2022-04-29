import { DataTypes } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Entity } from '../entity/entity.model';

@Table({
  tableName: 'nest_entity_token',
  paranoid: true,
})
export class EntityToken extends Model {
  @Column(DataTypes.STRING(1024))
  hashedAccessToken: string;

  @NotNull
  @AllowNull(false)
  @Unique
  @Column(DataTypes.STRING(1024))
  hashedRefreshToken: string;

  @PrimaryKey
  @ForeignKey(() => Entity)
  @Column(DataTypes.UUID)
  entityId: string;

  @BelongsTo(() => Entity, 'entityId')
  entity: Entity;
}
