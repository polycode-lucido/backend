import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exercise } from 'src/content/exercice/entities/exercise.schema';
import { Content } from 'src/content/models/content.class';
import { Parent } from 'src/content/models/parent.interface';
import * as mongoose from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course extends Content implements Parent {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercice' })
  childrenExercise: Exercise[];

  @Prop()
  description: string;

  getChildren() {
    return this.childrenExercise;
  }
}

export const CourseSchema = SchemaFactory.createForClass(Course);
