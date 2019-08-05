import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'core/decorators/user.dacorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  /**
   * 登陆
   * @param data
   */
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  async authTest(@User() user) {
    // tslint:disable-next-line: no-console
    console.log( user );
    return {
      message: 'ok',
    };
  }
}
