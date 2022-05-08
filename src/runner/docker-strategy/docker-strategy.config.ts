import { RunnerOptions } from '../runner.model';
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { RunLanguages } from '../runner.model';

export const validationSchema = Joi.object({
  RUNNER_TIMEOUT: Joi.number().default(15000),
  RUNNER_DOCKER_PYTHON_IMAGE: Joi.string().default('python:3.9'),
  RUNNER_DOCKER_RUST_IMAGE: Joi.string().default('rust:1.59'),
  RUNNER_DOCKER_JAVA_IMAGE: Joi.string().default('openjdk:17-jdk'),
  RUNNER_DOCKER_NODE_IMAGE: Joi.string().default('node:18'),
});

export const registerer = registerAs('docker', (): RunnerOptions => {
  const images = [
    {
      tag: process.env['RUNNER_DOCKER_PYTHON_IMAGE'],
      language: RunLanguages.Python,
    },
    {
      tag: process.env['RUNNER_DOCKER_RUST_IMAGE'],
      language: RunLanguages.Rust,
    },
    {
      tag: process.env['RUNNER_DOCKER_JAVA_IMAGE'],
      language: RunLanguages.Java,
    },
    {
      tag: process.env['RUNNER_DOCKER_NODE_IMAGE'],
      language: RunLanguages.Node,
    },
  ];

  return {
    timeout: parseInt(process.env['RUNNER_TIMEOUT']),
    docker: {
      images,
      docker: undefined,
    },
  };
});
