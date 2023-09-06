import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  //   @Get()
  //   getWAlletUsers() {
  //     return this.walletService.getUsers();
  //   }

  @Get()
  getWAlletUsers2() {
    return this.walletService.getUsers2();
  }
}
