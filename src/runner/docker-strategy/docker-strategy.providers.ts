import { Logger } from '@nestjs/common';
import * as Docker from 'dockerode';
import { Stream } from 'stream';
import { RunLanguages, RunnerOptions } from '../runner.module';
import { DockerImagesDescription } from './docker-strategy.service';

export async function imagesProvidersFactory(options: RunnerOptions) {
  const images: DockerImagesDescription[] = [
    {
      tag: 'node:18',
      language: RunLanguages.Node,
    },
    {
      tag: 'python:3.9',
      language: RunLanguages.Python,
    },
    {
      tag: 'openjdk:17-jdk',
      language: RunLanguages.Java,
    },
    {
      tag: 'rust:latest',
      language: RunLanguages.Rust,
    },
  ];
  try {
    const dockerInstance = new Docker();
    if (!dockerInstance.ping()) {
      throw new Error('Docker is not available');
    }

    const optionsImages = options?.docker?.images;

    if (optionsImages) {
      optionsImages.forEach((image) => {
        images.find((i) => i.language == image.language).tag = image.tag;
      });
    }

    const promises: Promise<void>[] = images.map((image) => {
      return new Promise((resolve, reject) => {
        Logger.log(`Pulling image ${image.tag} for ${image.language}`);
        dockerInstance.pull(image.tag, (err, stream: Stream) => {
          if (err) {
            Logger.error(err);
            reject(err);
          }
          stream.addListener('data', (data) => {
            Logger.log(
              data
                .toString()
                .trim()
                .replace('"}', '')
                .replace('{"status":"', '')
                .replace('"\n', ''),
              'DockerStrategyService ' +
                image.language.toString().toUpperCase(),
            );
          });
          stream.addListener('end', () => {
            Logger.log(
              `Pull for ${image.tag} for ${image.language} is done`,
              'DockerStrategyService ' +
                image.language.toString().toUpperCase(),
            );
            resolve(null);
          });
        });
      });
    });

    await Promise.all(promises);

    options = { docker: { images, docker: dockerInstance }, ...options };
    return options;
  } catch (err: unknown) {
    Logger.error(err);
  }
}
