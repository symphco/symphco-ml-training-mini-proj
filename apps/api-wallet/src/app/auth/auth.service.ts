import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
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

  async login(user: LoginAuthDto): Promise<{ access_token: string } | null> {
    const payload = { username: user.username, sub: user.password };
    const validUser = await this.walletService.validateUser(
      payload.username,
      payload.sub
    );

    if (!validUser) throw new NotFoundException();

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
