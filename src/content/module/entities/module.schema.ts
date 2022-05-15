import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Content } from 'src/content/models/content.class';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Course } from 'src/content/course/entities/course.schema';
import { Children } from 'src/content/models/children.interface';
import { Parent } from 'src/content/models/parent.interface';
import { Exercise } from 'src/content/exercice/entities/exercise.schema';
import { Lesson } from 'src/content/lesson/entities/lesson.schema';

export type ModuleDocument = Module & Document;

@Schema()
export class Module extends Content implements Children, Parent {
  @Prop({ required: true })
  markdown: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  parentCourse: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Module' })
  parentModule: Module;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercice' })
  exercises: Exercise[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' })
  lessons: Lesson[];

  getParent(): Parent {
    return this.parentCourse;
  }

  setParent(parent: Parent) {
    if (parent instanceof Course) {
      this.parentCourse = parent;
    } else if (parent instanceof Module) {
      this.parentModule = parent;
    }
  }

  getChildren(): Children[] {
    return [...this.exercises, ...this.lessons];
  }
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
