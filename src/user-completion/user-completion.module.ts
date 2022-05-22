import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { registerer, validationSchema } from 'src/content/course/mongo.config';
import { CourseCompletionModule } from './course-completion/course-completion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [registerer],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('mongo'),
      inject: [ConfigService],
    }),
    CourseCompletionModule,
  ],
})
export class UserCompletionModule {}
