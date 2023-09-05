import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ConfigModule } from '@nestjs/config';
import DB_Config from '../../db_config/db.config';
import sampleConnectionProvider from '../database/providers/db_provider';

@Module({
  imports: [ConfigModule.forFeature(DB_Config)],
  exports: [sampleConnectionProvider],
  providers: [WalletService, sampleConnectionProvider],
  controllers: [WalletController],
})
export class WalletModule {}
