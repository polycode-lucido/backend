import { Prop } from '@nestjs/mongoose';
import { Max, Min } from 'class-validator';

export abstract class Content {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true, min: 1, max: 5 })
  @Min(1, { message: 'Difficulty must be between 1 and 5' })
  @Max(5, { message: 'Difficulty must be between 1 and 5' })
  difficulty: number;
}

export type ContentDocument = Content & Document;
