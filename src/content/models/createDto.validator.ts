import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { ChildrenDto } from './children.interface';

export function EitherParentCourseOrParentModule(
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'eitherParentCourseOrParentModule',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(object: unknown, args: ValidationArguments) {
          const parentModule = (args.object as ChildrenDto).parentModule;
          const parentCourse = (args.object as ChildrenDto).parentCourse;
          return (
            (parentModule === undefined &&
              parentCourse !== undefined &&
              typeof parentCourse === 'string') ||
            (parentCourse === undefined &&
              parentModule !== undefined &&
              typeof parentModule === 'string')
          );
        },
      },
    });
  };
}
