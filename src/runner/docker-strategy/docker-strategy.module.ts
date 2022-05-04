import { DynamicModule, Module } from '@nestjs/common';
import { RunnerOptions } from '../runner.module';
import { imagesProvidersFactory } from './docker-strategy.providers';
import { DockerStrategyService } from './docker-strategy.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'RunnerOptions',
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
        {
          provide: 'RunnerOptions',
          useFactory: async () => await imagesProvidersFactory(options),
        },
        DockerStrategyService,
      ],
      module: DockerStrategyModule,
      exports: [DockerStrategyService],
    };
  }
}
