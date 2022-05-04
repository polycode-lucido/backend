import { Test, TestingModule } from '@nestjs/testing';
import { DockerStrategyService } from './docker-strategy.service';

describe('DockerStrategyService', () => {
  let service: DockerStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockerStrategyService],
    }).compile();

    service = module.get<DockerStrategyService>(DockerStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
