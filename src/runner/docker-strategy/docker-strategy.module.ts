import { DynamicModule, Module } from '@nestjs/common';
import { RunnerOptions } from '../runner.module';
import {
  imagesProvidersFactory,
  RUNNER_OPTIONS,
} from './docker-strategy.providers';
import { DockerStrategyService } from './docker-strategy.service';

@Module({
  imports: [],
  providers: [
    DockerStrategyService,
    {
      provide: RUNNER_OPTIONS,
      useFactory: async () => await imagesProvidersFactory({}),
    },
  ],
  exports: [DockerStrategyService],
})
export class DockerStrategyModule {
  static register(options?: RunnerOptions): DynamicModule {
    return {
      imports: [],
      providers: [
        DockerStrategyService,
        {
          provide: RUNNER_OPTIONS,
          useFactory: async () => await imagesProvidersFactory(options),
        },
      ],
      module: DockerStrategyModule,
      exports: [DockerStrategyService],
    };
  }
}
