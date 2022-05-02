import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EntityModule } from './entity/entity.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env['DATABASE_DIALECT'] as Dialect,
      host: process.env['DATABASE_HOST'],
      port: parseInt(process.env['DATABASE_PORT']),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATAABASE_PASSWORD'] || '',
      database: process.env['DATABASE_DB'],
      autoLoadModels: true,
      synchronize: true,
      logQueryParameters: true,
    }),
    EntityModule,
    TokenModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
