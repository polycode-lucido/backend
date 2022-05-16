import { Test, TestingModule } from '@nestjs/testing';
import { CourseCompletionController } from './course-completion.controller';
import { CourseCompletionService } from './course-completion.service';

describe('CourseCompletionController', () => {
  let controller: CourseCompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseCompletionController],
      providers: [CourseCompletionService],
    }).compile();

    controller = module.get<CourseCompletionController>(CourseCompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
