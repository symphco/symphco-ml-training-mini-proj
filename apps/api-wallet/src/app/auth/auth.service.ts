import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from '../../dtos/LoginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly walletService: WalletService,
    private jwtService: JwtService
  ) {}

  @UsePipes(ValidationPipe)
  async login(user: LoginAuthDto): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.password };
    await this.walletService.validate(payload.username, payload.sub);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
