import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ExerciseService } from 'src/content/exercise/exercise.service';
import { EntityService } from 'src/entity/entity.service';
import { NotFoundError } from 'src/errors';
import { CourseCompletionService } from 'src/user-completion/course-completion/course-completion.service';
import { RunLanguages, RunnerProvider } from './runner.model';

@Injectable()
export class RunnerService {
  private runnerProvider: RunnerProvider;

  constructor(
    @Inject('RunnerProviderService') runnerProviderService: RunnerProvider,
    private exerciseService: ExerciseService,
    private courseCompletionService: CourseCompletionService,
    private entityService: EntityService,
  ) {
    this.runnerProvider = runnerProviderService;
  }

  async run(sourceCode: string, language: RunLanguages, runId: string) {
    return await this.runnerProvider.run(sourceCode, language, runId);
  }

  async runFor(
    sourceCode: string,
    language: RunLanguages,
    exerciseId: string,
    courseCompletionId: string,
    entityId: string,
  ) {
    const runId = randomUUID();
    const entity = await this.entityService.findById(entityId);
    if (!entity) {
      throw new NotFoundError('Entity not found');
    }

    const exerciseCompletion =
      await this.courseCompletionService.findExerciseCompletion(
        courseCompletionId,
        exerciseId,
      );

    if (!exerciseCompletion) {
      throw new NotFoundError('Exercise not found');
    }

    const runResults = await this.run(sourceCode, language, runId);

    runResults.outputMatching =
      exerciseCompletion.exercise.expectedOutput.reduce(
        (acc, expectedOutput, index) => {
          if (expectedOutput === runResults.stdout.split('\n')[index]) {
            return acc && true;
          } else return false;
        },
        true,
      );

    if (runResults.outputMatching) {
      exerciseCompletion.exerciseCompletion.sourceCode = [
        ...exerciseCompletion.exerciseCompletion.sourceCode,
        { runLanguage: language as RunLanguages, sourceCode },
      ];
      exerciseCompletion.exerciseCompletion.sucessfulRun = [
        ...exerciseCompletion.exerciseCompletion.sucessfulRun,
        { runLanguage: language as RunLanguages, result: runResults },
      ];
      exerciseCompletion.exerciseCompletion.completed = true;
    }

    return runResults;
  }
}
