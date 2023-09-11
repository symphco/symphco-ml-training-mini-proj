import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
