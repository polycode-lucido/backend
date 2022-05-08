import { InvalidArgumentError } from './../errors';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DockerStrategyModule } from './docker-strategy/docker-strategy.module';
import { DockerStrategyService } from './docker-strategy/docker-strategy.service';
import { ForkStrategyModule } from './fork-strategy/fork-strategy.module';
import { ForkStrategyService } from './fork-strategy/fork-strategy.service';
import { RunnerController } from './runner.controller';
import { RunnerProviderType } from './runner.model';
import { RunnerService } from './runner.service';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class RunnerModule {
  static forRoot(): DynamicModule {
    const runnerProvider = process.env['RUNNER_PROVIDER'];
    if (
      !runnerProvider ||
      (runnerProvider !== RunnerProviderType.Docker &&
        runnerProvider !== RunnerProviderType.ForkExec)
    ) {
      throw new InvalidArgumentError(
        'RUNNER_PROVIDER is not defined or invalid ( must be docker or forkexec )',
      );
    }

    const common = {
      module: RunnerModule,
      exports: [RunnerService],
      controllers: [RunnerController],
    };

    switch (runnerProvider) {
      case RunnerProviderType.ForkExec:
        return {
          ...common,
          imports: [ForkStrategyModule.registerAsync()],
          providers: [
            RunnerService,
            {
              provide: 'RunnerProviderService',
              useExisting: ForkStrategyService,
            },
          ],
        };
      case RunnerProviderType.Docker:
        return {
          ...common,
          imports: [DockerStrategyModule.registerAsync()],
          providers: [
            RunnerService,
            {
              provide: 'RunnerProviderService',
              useExisting: DockerStrategyService,
            },
          ],
        };
    }
  }
}
