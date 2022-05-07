import { Inject, Injectable, Logger } from '@nestjs/common';
import * as Docker from 'dockerode';
import { randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import { Stream } from 'node:stream';
import { UnknownError } from 'src/errors';
import {
  RunLanguages,
  RunnerExecutionResults,
  RunnerOptions,
  RunnerProvider,
} from '../runner.module';
import { RUNNER_OPTIONS } from './docker-strategy.providers';

export interface DockerImagesDescription {
  tag: string;
  language: RunLanguages;
}

@Injectable()
export class DockerStrategyService implements RunnerProvider {
  private docker: Docker;
  private timeout = 15000;
  private images: DockerImagesDescription[];

  constructor(
    @Inject(RUNNER_OPTIONS) private readonly runnerOptions: RunnerOptions,
  ) {
    this.docker = runnerOptions.docker.docker;
    this.images = runnerOptions.docker.images;
    if (runnerOptions.docker.timeout) {
      this.timeout = runnerOptions.docker.timeout;
    }
  }

  async run(
    sourceCode: string,
    language: RunLanguages,
    runId: number,
  ): Promise<RunnerExecutionResults> {
    try {
      const image = this.images.find(
        (image) => image.language == (language as RunLanguages),
      );
      if (!image) {
        throw new Error(`Language ${language} is not supported`);
      }

      const folderPath = this.createFolder();
      const filepath = this.writeSourceCode(folderPath, sourceCode, language);
      const command = this.commandFromLanguage(language, filepath);

      const container = await this.docker.createContainer({
        Image: image.tag,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        NetworkDisabled: true,
        WorkingDir: `/app`,
        HostConfig: {
          ReadonlyRootfs: true,
          NetworkMode: 'none',
          Binds: [`${folderPath}:/app`],
          Tmpfs:
            image.language === RunLanguages.Rust
              ? {
                  '/tmp': 'rw,exec,nosuid,size=65536k',
                }
              : {},
        },
        Tty: false,
        User: 'nobody',
        Cmd: command,
      });

      Logger.debug(
        `Starting container ${container.id} for language ${language}`,
      );
      await container.start();

      const stdoutBuffer = [];
      const stderrBuffer = [];

      container.attach(
        { stream: true, stdout: true, stderr: true },
        (err, stream) => {
          const stderr = new Stream.PassThrough();
          const stdout = new Stream.PassThrough();

          container.modem.demuxStream(stream, stdout, stderr);

          stderr.on('data', (data) => {
            stderrBuffer.push(data);
          });
          stdout.on('data', (data) => {
            stdoutBuffer.push(data);
          });
        },
      );

      const exitCode = await Promise.race([container.wait(), this.timeoutIn()]);
      Logger.debug(`Container ${container.id} ended for language ${language}`);

      await container.kill();
      await container.remove();

      return {
        stdout: Buffer.concat(stdoutBuffer).toString(),
        stderr: Buffer.concat(stderrBuffer).toString(),
        exitCode: exitCode.StatusCode,
        runId,
      };
    } catch (error) {
      Logger.error(error);
      throw new UnknownError(error.message);
    }
  }

  private createFolder(): string {
    const uuid = randomUUID();
    const folder = `/tmp/${uuid}/`;
    fs.mkdirSync(folder);
    return folder;
  }

  private writeSourceCode(
    folder: string,
    sourceCode: string,
    language: RunLanguages,
  ): string {
    const filename = this.filenameFromLanguage(language);
    const path = `${folder}${filename}`;
    const file = fs.openSync(path, 'w');
    fs.writeSync(file, sourceCode);
    return filename;
  }

  private filenameFromLanguage(language: RunLanguages): string {
    switch (language) {
      case RunLanguages.Java:
        return 'Application.java';
      case RunLanguages.Python:
        return 'main.py';
      case RunLanguages.Rust:
        return 'main.rs';
      case RunLanguages.Node:
        return 'index.js';
      default:
        throw new Error(`Language ${language} is not supported`);
    }
  }

  private commandFromLanguage(
    language: RunLanguages,
    filepath: string,
  ): string[] {
    switch (language) {
      case RunLanguages.Java:
        return ['java', filepath];
      case RunLanguages.Python:
        return ['python', filepath];
      case RunLanguages.Rust:
        return ['sh', '-c', `rustc main.rs -o /tmp/main  && /tmp/main`];
      case RunLanguages.Node:
        return ['node', filepath];
    }
  }

  private timeoutIn(): Promise<{ StatusCode: number }> {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ StatusCode: -128 }), this.timeout),
    );
  }
}
