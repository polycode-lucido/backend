import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from 'src/email/email.service';
import { HTTPErrorFilter } from 'src/errors';
import { EntityService } from './entity.service';
import { EntityDTO } from './entityDTO.model';

@Controller()
@UseFilters(HTTPErrorFilter)
export class EntityController {
  constructor(
    private readonly entityService: EntityService,
    private readonly emailService: EmailService,
  ) {}

  @Post('user/register')
  @HttpCode(201)
  async register(@Body() entityPayload: EntityDTO) {
    const entity = await this.entityService.create(entityPayload);
    return { uuid: entity.id };
  }

  @Get('user/verify/:token')
  async verify(@Req() req, @Param('token') token: string) {
    return await this.entityService.verifyUser(token);
  }

  @Get('user/resend/:email')
  async resend(@Param('email') email: string) {
    const entity = await this.entityService.findByEmail(email);
    return await this.entityService.sendVerificationEmail(entity);
  }

  @Get('user/forgotpassword/:email')
  async forgotPassword(@Param('email') email: string) {
    return await this.entityService.sendResetPasswordEmail(email);
  }

  @Post('user/resetpassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() payload: { password: string },
  ) {
    return await this.entityService.resetPassword(token, payload.password);
  }

  @UseGuards(AuthGuard('access'))
  @Get('user/me')
  async me(@Req() req) {
    return await this.entityService.findById(req.user);
  }
}
