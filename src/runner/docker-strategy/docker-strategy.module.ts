import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RunnerOptions, RUNNER_OPTIONS } from '../runner.model';
import {
  imagesProvidersFactory,
  imagesProvidersFactoryAsync,
} from './docker-strategy.providers';
import { DockerStrategyService } from './docker-strategy.service';
import { registerer, validationSchema } from './docker-strategy.config';

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

  static async registerAsync(): Promise<DynamicModule> {
    return {
      imports: [
        ConfigModule.forRoot({
          load: [registerer],
          validationSchema: validationSchema,
        }),
      ],
      providers: [
        DockerStrategyService,
        {
          provide: RUNNER_OPTIONS,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            await imagesProvidersFactoryAsync(configService),
        },
      ],
      module: DockerStrategyModule,
      exports: [DockerStrategyService],
    };
  }
}
