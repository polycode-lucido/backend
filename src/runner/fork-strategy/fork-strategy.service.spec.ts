import { Test, TestingModule } from '@nestjs/testing';
import { ForkStrategyService } from './fork-strategy.service';

describe('ForkStrategyService', () => {
  let service: ForkStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForkStrategyService],
    }).compile();

    service = module.get<ForkStrategyService>(ForkStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
