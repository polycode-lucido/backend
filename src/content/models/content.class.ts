import { Prop } from '@nestjs/mongoose';
import { IsDefined, Max, Min } from 'class-validator';

export abstract class Content {
  @IsDefined()
  @Prop({ required: true })
  name: string;

  @IsDefined()
  @Prop({ required: true })
  authorId: string;

  @IsDefined()
  @Prop({ required: true, min: 1, max: 5 })
  @Min(1, { message: 'Difficulty must be between 1 and 5' })
  @Max(5, { message: 'Difficulty must be between 1 and 5' })
  difficulty: number;
}

export type ContentDocument = Content & Document;
