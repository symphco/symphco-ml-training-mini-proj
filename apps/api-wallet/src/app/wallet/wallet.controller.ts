import { Controller, Get, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  //   @Get()
  //   getWAlletUsers() {
  //     return this.walletService.getUsers();
  //   }
  @UseGuards(AuthGuard('local'))
  @Get()
  getWAlletUsers2() {
    return this.walletService.getUsers2();
  }
}
