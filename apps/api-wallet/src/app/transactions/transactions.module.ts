import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { ConfigModule } from '@nestjs/config';
import WalletDBConfig from '../../db_config/db.config';
import walletDbConnectionProvider from '../database/providers/db_provider';
import { OtpService } from '../otp/otp.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [ConfigModule.forFeature(WalletDBConfig)],
  exports: [walletDbConnectionProvider],
  controllers: [TransactionsController],
  providers: [TransactionsService, walletDbConnectionProvider],
})
export class TransactionsModule {}
