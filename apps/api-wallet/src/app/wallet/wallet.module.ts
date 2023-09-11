import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ConfigModule } from '@nestjs/config';
import WalletDBConfig from '../../db_config/db.config';
import walletDbConnectionProvider from '../database/providers/db_provider';

@Module({
  imports: [ConfigModule.forFeature(WalletDBConfig)],
  exports: [walletDbConnectionProvider],
  providers: [WalletService, walletDbConnectionProvider],
  controllers: [WalletController],
})
export class WalletModule {}
