import { Inject, Injectable } from '@nestjs/common';
import { RunLanguages, RunnerProvider } from './runner.module';

@Injectable()
export class RunnerService {
  private runnerProvider: RunnerProvider;

  constructor(
    @Inject('RunnerProviderService') runnerProviderService: RunnerProvider,
  ) {
    this.runnerProvider = runnerProviderService;
  }

  async run(sourceCode: string, strategy: RunLanguages, runId: number) {
    return await this.runnerProvider.run(sourceCode, strategy, runId);
  }
}
