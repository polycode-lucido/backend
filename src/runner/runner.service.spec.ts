import { Test, TestingModule } from '@nestjs/testing';
import { DockerStrategyModule } from './docker-strategy/docker-strategy.module';
import { DockerStrategyService } from './docker-strategy/docker-strategy.service';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';

describe('RunnerService', () => {
  let service: RunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      exports: [RunnerService],
      controllers: [RunnerController],
      imports: [DockerStrategyModule.registerAsync()],
      providers: [
        RunnerService,
        {
          provide: 'RunnerProviderService',
          useExisting: DockerStrategyService,
        },
      ],
    }).compile();

    service = module.get<RunnerService>(RunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
