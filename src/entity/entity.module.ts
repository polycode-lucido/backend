import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailModule, EmailProviderType } from 'src/email/email.module';
import { TokenModule } from 'src/token/token.module';
import { EntityController } from './entity.controller';
import { Entity } from './entity.model';
import { EntityService } from './entity.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Entity]),
    TokenModule,
    EmailModule.forRoot({ emailProvider: EmailProviderType.SES }),
  ],
  exports: [EntityService],
  providers: [EntityService],
  controllers: [EntityController],
})
export class EntityModule {}
