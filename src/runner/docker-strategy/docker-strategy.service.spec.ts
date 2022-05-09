import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RUNNER_OPTIONS } from '../runner.model';
import { registerer, validationSchema } from './docker-strategy.config';
import { imagesProvidersFactoryAsync } from './docker-strategy.providers';
import { DockerStrategyService } from './docker-strategy.service';

describe('DockerStrategyService', () => {
  let service: DockerStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      exports: [DockerStrategyService],
    }).compile();

    service = module.get<DockerStrategyService>(DockerStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
