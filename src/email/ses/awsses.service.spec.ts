import { Test, TestingModule } from '@nestjs/testing';
import { AWSSesService } from './awsses.service';

describe('SesService', () => {
  let service: AWSSesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AWSSesService],
    }).compile();

    service = module.get<AWSSesService>(AWSSesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
