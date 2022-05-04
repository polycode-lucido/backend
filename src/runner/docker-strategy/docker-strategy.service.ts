import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import * as Docker from 'dockerode';
import {
  RunLanguages,
  RunnerExecutionResults,
  RunnerOptions,
  RunnerProvider,
} from '../runner.module';

export interface DockerImagesDescription {
  tag: string;
  language: RunLanguages;
}

@Injectable()
export class DockerStrategyService implements RunnerProvider {
  private docker: Docker;
  private images: DockerImagesDescription[];

  constructor(
    @Inject('RunnerOptions') private readonly runnerOptions: RunnerOptions,
  ) {
    this.docker = runnerOptions.docker.docker;
    this.images = runnerOptions.docker.images;
  }

  async run(
    sourceCode: string,
    language: RunLanguages,
  ): Promise<RunnerExecutionResults> {
    throw new NotImplementedException();
  }
}
