import { Prop } from '@nestjs/mongoose';
import { ContentCompletion } from './content-completion.schema';

export abstract class ContentCompletionParent extends ContentCompletion {
  @Prop()
  children: ContentCompletion[];

  isCompleted(): boolean {
    return this.children.every((child) => child.isCompleted());
  }

  progressRate(): number {
    return (
      this.children.reduce((acc, child) => acc + child.progressRate(), 0) /
      this.children.length
    );
  }
}

export type ContentDocument = ContentCompletionParent & Document;
