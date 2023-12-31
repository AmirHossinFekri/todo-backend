import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  login(@Body() loginData: loginDto) {
    return this.authService.login(loginData);
  }
}
