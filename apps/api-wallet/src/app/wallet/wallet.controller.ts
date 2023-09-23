import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('active')
  getActiveUsers(): Promise<any[] | null> {
    return this.walletService.getActiveUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getWAlletUsers(): Promise<any[] | undefined> {
    return this.walletService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<any | undefined> {
    return this.walletService.getUserById(id);
  }
}
