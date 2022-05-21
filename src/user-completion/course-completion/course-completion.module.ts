import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from 'src/content/content.module';
import { EntityModule } from 'src/entity/entity.module';
import { CourseCompletionController } from './course-completion.controller';
import { CourseCompletionService } from './course-completion.service';
import {
  CourseCompletion,
  CourseCompletionSchema,
} from './entities/course-completion.schema';

@Module({
  imports: [
    ContentModule,
    EntityModule,
    MongooseModule.forFeatureAsync([
      {
        name: CourseCompletion.name,
        useFactory: () => {
          const schema = CourseCompletionSchema;
          schema.pre(['findOne', 'find'], function (next) {
            this.populate('course');
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [CourseCompletionController],
  providers: [CourseCompletionService],
  exports: [CourseCompletionService],
})
export class CourseCompletionModule {}
