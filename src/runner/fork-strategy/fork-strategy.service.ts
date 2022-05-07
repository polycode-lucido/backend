import { Injectable } from '@nestjs/common';
import {
  RunLanguages,
  RunnerExecutionResults,
  RunnerProvider,
} from '../runner.module';
import * as fs from 'node:fs';
import * as process from 'node:child_process';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ForkStrategyService implements RunnerProvider {
  async run(
    sourceCode: string,
    strategy: RunLanguages,
    runId: number,
  ): Promise<RunnerExecutionResults> {
    switch (strategy) {
      case RunLanguages.Python:
        return { runId, ...(await this.runPython(sourceCode)) };
      case RunLanguages.Java:
        return { runId, ...(await this.runJava(sourceCode)) };
      case RunLanguages.Rust:
        return { runId, ...(await this.runRust(sourceCode)) };
      case RunLanguages.Node:
        return { runId, ...(await this.runNode(sourceCode)) };
    }
  }

  private async runNode(
    sourceCode: string,
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const filename = this.writeSourceCode(sourceCode, 'js');
    return this.exec('node', [filename]);
  }

  private async runPython(
    sourceCode: string,
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const filename = this.writeSourceCode(sourceCode, 'py');
    return this.exec('python3', [filename]);
  }

  private async runJava(
    sourceCode: string,
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const filename = this.writeSourceCode(sourceCode, 'java');
    return this.exec('java', [filename]);
  }

  private async runRust(
    sourceCode: string,
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const filename = this.writeSourceCode(sourceCode, 'rs');
    const binaryFile = filename.slice(0, -3);
    const compiler = await this.exec(
      'rustc',
      [filename, '-o', binaryFile],
      false,
    );

    if (compiler.exitCode !== 0) {
      return compiler;
    }

    const execution = await this.exec(binaryFile);
    this.deleteSourceCode([filename, binaryFile]);
    return execution;
  }

  private writeSourceCode(sourceCode: string, extension?: string): string {
    const uuid = randomUUID();
    const filename = `/tmp/${uuid + (extension ? '.' + extension : '')}`;
    const file = fs.openSync(filename, 'w');
    fs.writeSync(file, sourceCode);
    return filename;
  }

  private deleteSourceCode(filename: string[]): void {
    if (filename) {
      filename.forEach((file) => {
        fs.unlink(file, (err) => console.error(err));
      });
    }
  }

  private async exec(
    binary: string,
    options?: string[],
    deleteFiles = true,
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    let stdout = '';
    let stderr = '';

    const child = process.spawn(binary, options);

    child.stdout.on('data', (data) => {
      stdout += data;
    });
    child.stderr.on('data', (data) => {
      stderr += data;
    });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (deleteFiles) {
          this.deleteSourceCode(options);
        }
        child.kill();
        const error = new Error('Timeout');
        reject({ stdout, stderr, error });
      }, 15000);

      child.on('close', (exitCode) => {
        if (deleteFiles) {
          this.deleteSourceCode(options);
        }
        clearTimeout(timeout);
        resolve({
          stdout,
          stderr,
          exitCode,
        });
      });
    });
  }
}
