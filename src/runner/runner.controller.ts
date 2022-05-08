import { Body, Controller, Post } from '@nestjs/common';
import { RunLanguages } from './runner.model';
import { RunnerService } from './runner.service';

@Controller()
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Post('run')
  async run(
    @Body() body: { sourceCode: string; language: RunLanguages; runId: number },
  ) {
    return await this.runnerService.run(
      body.sourceCode,
      body.language,
      body.runId,
    );
  }
}
