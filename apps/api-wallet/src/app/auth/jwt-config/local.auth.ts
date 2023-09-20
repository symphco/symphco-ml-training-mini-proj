import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { WalletService } from '../../wallet/wallet.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private walletService: WalletService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.walletService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
