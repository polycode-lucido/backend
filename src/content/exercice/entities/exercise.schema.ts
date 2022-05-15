import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Content } from 'src/content/models/content.class';
import * as mongoose from 'mongoose';
import { Course } from 'src/content/course/entities/course.schema';
import { Children } from 'src/content/models/children.interface';
import { Parent } from 'src/content/models/parent.interface';
import { Module } from 'src/content/module/entities/module.schema';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise extends Content implements Children {
  @Prop({ required: true })
  markdown: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  parentCourse: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Module' })
  parentModule: Module;

  setParent(parent: Parent) {
    if (parent instanceof Course) {
      this.parentCourse = parent;
    } else if (parent instanceof Module) {
      this.parentModule = parent;
    }
  }

  getParent(): Parent {
    return this.parentCourse || this.parentModule;
  }
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
