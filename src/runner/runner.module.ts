import { DynamicModule, Module } from '@nestjs/common';
import { RunnerService } from './runner.service';
import { ForkStrategyModule } from './fork-strategy/fork-strategy.module';
import { ForkStrategyService } from './fork-strategy/fork-strategy.service';
import { RunnerController } from './runner.controller';
import { DockerStrategyModule } from './docker-strategy/docker-strategy.module';
import {
  DockerImagesDescription,
  DockerStrategyService,
} from './docker-strategy/docker-strategy.service';
import Dockerode from 'dockerode';

export enum RunnerProviderType {
  Docker,
  ForkExec,
}

export enum RunLanguages {
  Node = 'node',
  Python = 'python',
  Java = 'java',
  Rust = 'rust',
}

export interface RunnerExecutionResults {
  stdout: string;
  stderr: string;
  exitCode?: number;
  runId: number;
}

export interface RunnerProvider {
  run(
    sourceCode: string,
    strategy: RunLanguages,
    runId: number,
  ): Promise<RunnerExecutionResults>;
}

export interface RunnerOptions {
  docker?: {
    images?: DockerImagesDescription[];
    docker?: Dockerode;
    timeout?: number;
  };
}
@Module({})
export class RunnerModule {
  static forRoot(
    runnerProvider: RunnerProviderType,
    options?: RunnerOptions,
  ): DynamicModule {
    switch (runnerProvider) {
      case RunnerProviderType.ForkExec:
        return {
          imports: [ForkStrategyModule],
          providers: [
            RunnerService,
            {
              provide: 'RunnerProviderService',
              useExisting: ForkStrategyService,
            },
          ],
          module: RunnerModule,
          exports: [RunnerService],
        };
      case RunnerProviderType.Docker:
        return {
          imports: [DockerStrategyModule.register(options)],
          providers: [
            RunnerService,
            {
              provide: 'RunnerProviderService',
              useExisting: DockerStrategyService,
            },
          ],
          module: RunnerModule,
          exports: [RunnerService],
          controllers: [RunnerController],
        };
    }
  }
}
