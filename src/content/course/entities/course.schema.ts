import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exercise } from 'src/content/exercise/entities/exercise.schema';
import { Content } from 'src/content/models/content.class';
import { Parent } from 'src/content/models/parent.interface';
import * as mongoose from 'mongoose';
import { Lesson } from 'src/content/lesson/entities/lesson.schema';
import { Allow, IsDefined } from 'class-validator';
import { Module } from 'src/content/module/entities/module.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course extends Content implements Parent {
  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Exercise' })
  exercises: Exercise[];

  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Lesson' })
  lessons: Lesson[];

  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Module' })
  modules: Module[];

  @IsDefined()
  @Prop()
  description: string;

  getChildren() {
    return [...this.exercises, ...this.lessons];
  }
}

export const CourseSchema = SchemaFactory.createForClass(Course);
