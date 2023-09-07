import { Injectable, NotAcceptableException } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly walletService: WalletService,
    private jwtService: JwtService
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.walletService.validate(username, password);
    // if (!user) return null;
    // const passwordValid = await bcrypt.compare(password, user.password);
    // if (!user) {
    //   throw new NotAcceptableException('could not find the user');
    // }
    if (!user) {
      return null;
    }
    return user;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
