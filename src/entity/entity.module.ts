import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenModule } from 'src/token/token.module';
import { EntityController } from './entity.controller';
import { Entity } from './entity.model';
import { EntityService } from './entity.service';

@Module({
  imports: [SequelizeModule.forFeature([Entity]), TokenModule],
  exports: [EntityService],
  providers: [EntityService],
  controllers: [EntityController],
})
export class EntityModule {}
