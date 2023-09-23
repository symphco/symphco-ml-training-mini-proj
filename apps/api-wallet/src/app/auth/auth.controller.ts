import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from '../../dtos/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() loginCred: LoginAuthDto) {
    return this.authService.login(loginCred);
  }
}
