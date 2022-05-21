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
  runId: string;
  outputMatching?: boolean;
}

export interface RunnerProvider {
  run(
    sourceCode: string,
    strategy: RunLanguages,
    runId: string,
  ): Promise<RunnerExecutionResults>;
}

export interface RunnerOptions {
  docker?: {
    images?: DockerImagesDescription[];
    docker?: Dockerode;
  };
  timeout?: number;
}
