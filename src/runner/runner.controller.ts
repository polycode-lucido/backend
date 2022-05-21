import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HTTPErrorFilter } from 'src/errors';
import { RunLanguages } from './runner.model';
import { RunnerService } from './runner.service';

@UseFilters(HTTPErrorFilter)
@Controller()
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @UseGuards(AuthGuard('access'))
  @Post('run')
  async run(
    @Req() req: any,
    @Body()
    body: {
      sourceCode: string;
      language: RunLanguages;
      exerciseId: string;
      courseCompletionId: string;
    },
  ) {
    return await this.runnerService.runFor(
      body.sourceCode,
      body.language,
      body.exerciseId,
      body.courseCompletionId,
      req.user,
    );
  }
}
