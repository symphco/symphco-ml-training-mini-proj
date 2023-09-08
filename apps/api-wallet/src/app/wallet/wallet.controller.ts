import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getWAlletUsers(): Promise<any[] | undefined> {
    return this.walletService.get_Users();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<any | undefined> {
    return this.walletService.getUserById(id);
  }
}
