import { Course } from '../course/entities/course.schema';
import { Module } from '../module/entities/module.schema';
import { Parent } from './parent.interface';

export interface Children {
  parentModule: Module;
  parentCourse: Course;

  setParent(parent: Parent): void;

  getParent(): Parent;
}
