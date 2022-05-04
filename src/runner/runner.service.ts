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

  async run(sourceCode: string, strategy: RunLanguages) {
    return await this.runnerProvider.run(sourceCode, strategy);
  }

  async runNode(sourceCode: string) {
    return await this.run(sourceCode, RunLanguages.Node);
  }

  async runPython(sourceCode: string) {
    return await this.run(sourceCode, RunLanguages.Python);
  }

  async runJava(sourceCode: string) {
    return await this.run(sourceCode, RunLanguages.Java);
  }

  async runRust(sourceCode: string) {
    return await this.run(sourceCode, RunLanguages.Rust);
  }
}
