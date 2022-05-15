import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';

export class UpdateModuleDto extends PartialType(
  OmitType(CreateModuleDto, ['parentCourse', 'parentModule']),
) {}
