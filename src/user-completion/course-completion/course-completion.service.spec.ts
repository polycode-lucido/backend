import { Test, TestingModule } from '@nestjs/testing';
import { CourseCompletionService } from './course-completion.service';

describe('CourseCompletionService', () => {
  let service: CourseCompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCompletionService],
    }).compile();

    service = module.get<CourseCompletionService>(CourseCompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
