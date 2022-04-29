import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HTTPErrorHandler } from 'src/errors';
import { EntityService } from './entity.service';
import { EntityDTO } from './entityDTO.model';

@Controller()
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post('auth/register')
  @HttpCode(201)
  async register(@Body() entityPayload: EntityDTO) {
    try {
      const entity = await this.entityService.create(entityPayload);
      return { uuid: entity.id };
    } catch (error) {
      HTTPErrorHandler(error);
    }
  }
}
