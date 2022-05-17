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
    MongooseModule.forFeature([
      { name: CourseCompletion.name, schema: CourseCompletionSchema },
    ]),
  ],
  controllers: [CourseCompletionController],
  providers: [CourseCompletionService],
})
export class CourseCompletionModule {}
