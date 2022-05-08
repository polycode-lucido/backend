import Dockerode from 'dockerode';
import { DockerImagesDescription } from './docker-strategy/docker-strategy.service';

export const RUNNER_OPTIONS = 'RunnerOptions';

export enum RunnerProviderType {
  Docker = 'docker',
  ForkExec = 'forkexec',
}

export enum RunLanguages {
  Node = 'node',
  Python = 'python',
  Java = 'java',
  Rust = 'rust',
}

export interface RunnerExecutionResults {
  stdout: string;
  stderr: string;
  exitCode?: number;
  runId: number;
}

export interface RunnerProvider {
  run(
    sourceCode: string,
    strategy: RunLanguages,
    runId: number,
  ): Promise<RunnerExecutionResults>;
}

export interface RunnerOptions {
  docker?: {
    images?: DockerImagesDescription[];
    docker?: Dockerode;
  };
  timeout?: number;
}
