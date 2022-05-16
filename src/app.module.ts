import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { registerer, validationSchema } from './database.config';
import { EntityModule } from './entity/entity.module';
import { RunnerModule } from './runner/runner.module';
import { TokenModule } from './token/token.module';
import { UserCompletionModule } from './user-completion/user-completion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [registerer],
      validationSchema,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),

      inject: [ConfigService],
    }),
    EntityModule,
    TokenModule,
    AuthModule,
    RunnerModule.forRoot(),
    ContentModule,
    UserCompletionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
