import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCompletionModule } from './course-completion/course-completion.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/polycode', {
      user: 'user',
      pass: 'password',
      logger: Logger.debug.bind(Logger),
      loggerLevel: 'debug',
    }),
    CourseCompletionModule,
  ],
})
export class UserCompletionModule {}
