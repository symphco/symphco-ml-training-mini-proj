import { Body, Controller, Post } from '@nestjs/common';
import { LoginAuthService } from './login-auth.service';
import { LoginAuthDto } from 'apps/api-wallet/src/dtos/LoginUser.dto';

@Controller('auth')
export class LoginAuthController {
  constructor(private readonly loginService: LoginAuthService) {}

  @Post('login')
  login(@Body() userCred: LoginAuthDto) {
    return this.loginService.loginUser(userCred);
  }
}
