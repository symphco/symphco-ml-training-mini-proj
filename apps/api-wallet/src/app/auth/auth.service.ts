import { Injectable, NotAcceptableException } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from '../../dtos/LoginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly walletService: WalletService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any | null> {
    const user = await this.walletService.validate(username, password);
    if (!user) return null;
    return user;
  }
  async login(user: LoginAuthDto): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
