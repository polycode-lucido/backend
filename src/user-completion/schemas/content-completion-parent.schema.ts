import { Prop } from '@nestjs/mongoose';
import { Allow } from 'class-validator';
import { CourseCompletion } from '../course-completion/entities/course-completion.schema';
import { ExerciseCompletion } from '../course-completion/entities/exercise-completion.schema';
import { LessonCompletion } from '../course-completion/entities/lesson-completion.schema';
import { ModuleCompletion } from '../course-completion/entities/module-completion.schema';
import { ContentCompletion, ContentType } from './content-completion.schema';

export abstract class ContentCompletionParent extends ContentCompletion {
  @Allow()
  @Prop()
  children: ContentCompletion[];
}

export type ContentDocument = ContentCompletionParent & Document;

export function computeProgressRate(courseCompletion: CourseCompletion) {
  const progressRate =
    courseCompletion.children.reduce((acc, child) => {
      if (
        child.type === ContentType.EXERCISE ||
        child.type === ContentType.LESSON
      ) {
        return (
          acc + computeProgressRateExerciseOrLesson(child as ExerciseCompletion)
        );
      }
      if (child.type === ContentType.MODULE) {
        return acc + computeProgressRateModule(child as ModuleCompletion);
      }
    }, 0) / courseCompletion.children.length;
  courseCompletion.progressRate = progressRate;
  return progressRate;
}

function computeProgressRateModule(moduleCompletion: ModuleCompletion) {
  if (moduleCompletion.children.length === 0) {
    moduleCompletion.progressRate = 100;
    return 100;
  }
  const progressRate =
    moduleCompletion.children.reduce((acc, child) => {
      if (
        child.type === ContentType.EXERCISE ||
        child.type === ContentType.LESSON
      ) {
        return (
          acc + computeProgressRateExerciseOrLesson(child as ExerciseCompletion)
        );
      }
      if (child.type === ContentType.MODULE) {
        return acc + computeProgressRateModule(child as ModuleCompletion);
      }
    }, 0) / moduleCompletion.children.length;
  moduleCompletion.progressRate = progressRate;
  return progressRate;
}

function computeProgressRateExerciseOrLesson(
  lessonOrExercise: LessonCompletion | ExerciseCompletion,
) {
  const progressRate = lessonOrExercise.completed ? 100 : 0;
  return progressRate;
}
