import { OmitType } from '@nestjs/mapped-types';
import { Allow } from 'class-validator';
import { EitherParentCourseOrParentModule } from 'src/content/models/createDto.validator';
import { Module } from '../entities/module.schema';

export class CreateModuleDto extends OmitType(Module, [
  'parentCourse',
  'parentModule',
  'lessons',
  'exercises',
  'modules',
]) {
  @EitherParentCourseOrParentModule({
    message: 'Either parentCourse or parentModule must be defined, not both',
  })
  @Allow()
  parentCourse?: string;
  @Allow()
  parentModule?: string;
}
