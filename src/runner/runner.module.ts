import { DynamicModule, Module } from '@nestjs/common';
import { RunnerService } from './runner.service';
import { ForkStrategyModule } from './fork-strategy/fork-strategy.module';
import { ForkStrategyService } from './fork-strategy/fork-strategy.service';
import { RunnerController } from './runner.controller';
import { DockerStrategyModule } from './docker-strategy/docker-strategy.module';

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
}

export interface RunnerProvider {
  run(
    sourceCode: string,
    strategy: RunLanguages,
  ): Promise<RunnerExecutionResults>;
}

@Module({
  imports: [DockerStrategyModule],
})
export class RunnerModule {
  static forRoot(options: {
    runnerProvider: RunnerProviderType;
  }): DynamicModule {
    switch (options.runnerProvider) {
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
          controllers: [RunnerController],
        };
    }
  }
}
