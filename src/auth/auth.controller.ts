import { Body, Controller, Post, Query } from '@nestjs/common';
import {
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthResetPasswordDto,
  AuthSignUpDto,
} from 'src/common/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  register(@Body() body: AuthSignUpDto) {
    return this.authService.register(body);
  }
  @Post('signin')
  login(@Body() body: AuthLoginDto) {
    return this.authService.login(body);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: AuthForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: AuthResetPasswordDto, @Query('token') token) {
    return this.authService.resetPassword(body, token);
  }
}
