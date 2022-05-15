import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Content } from 'src/content/models/content.class';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from 'src/content/course/entities/course.schema';
import { Children } from 'src/content/models/children.interface';
import { Parent } from 'src/content/models/parent.interface';
import { Module } from 'src/content/module/entities/module.schema';
import { IsDefined } from 'class-validator';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson extends Content implements Children {
  @IsDefined()
  @Prop({ required: true })
  markdown: string;

  @IsDefined()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  parentCourse: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Module' })
  parentModule: Module;

  getParent(): Parent {
    return this.parentCourse || this.parentModule;
  }

  setParent(parent: Parent) {
    if (parent instanceof Course) {
      this.parentCourse = parent;
    } else if (parent instanceof Module) {
      this.parentModule = parent;
    }
  }
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
