import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { HTTPErrorHandler } from 'src/errors';
import { EntityService } from './entity.service';
import { EntityDTO } from './entityDTO.model';

@Controller()
export class EntityController {
  constructor(
    private readonly entityService: EntityService,
    private readonly emailService: EmailService,
  ) {}

  @Post('user/register')
  @HttpCode(201)
  async register(@Body() entityPayload: EntityDTO) {
    try {
      const entity = await this.entityService.create(entityPayload);
      return { uuid: entity.id };
    } catch (error) {
      HTTPErrorHandler(error);
    }
  }

  @Get('user/verify/:token')
  async verify(@Req() req, @Param('token') token: string) {
    try {
      return await this.entityService.verifyUser(token);
    } catch (error) {
      HTTPErrorHandler(error);
    }
  }

  @Get('user/resend/:email')
  async resend(@Param('email') email: string) {
    try {
      const entity = await this.entityService.findByEmail(email);
      return await this.entityService.sendVerificationEmail(entity);
    } catch (error) {
      HTTPErrorHandler(error);
    }
  }

  @Get('user/forgotpassword/:email')
  async forgotPassword(@Param('email') email: string) {
    try {
      return await this.entityService.sendResetPasswordEmail(email);
    } catch (error) {
      HTTPErrorHandler(error);
    }
  }

  @Post('user/resetpassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() payload: { password: string },
  ) {
    try {
      return await this.entityService.resetPassword(token, payload.password);
    } catch (error) {
      HTTPErrorHandler(error);
    }
  }
}
