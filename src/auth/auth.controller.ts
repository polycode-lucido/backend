import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvalidArgumentError } from 'src/errors';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('refresh'))
  @Get('auth/token')
  async token(@Request() req) {
    const userId = req.user;

    if (!userId) {
      throw new InvalidArgumentError('UserId is required');
    }

    return { accessToken: await this.authService.newAccessToken(userId) };
  }
}
