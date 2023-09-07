import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from '../../dtos/LoginUser.dto';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  //   @Get()
  //   getWAlletUsers() {
  //     return this.walletService.getUsers();
  //   }
  @UseGuards(AuthGuard('jwt'))
  @Get('wallet')
  getWAlletUsers2(): Promise<any[] | undefined> {
    return this.walletService.getUsers2();
  }
}
