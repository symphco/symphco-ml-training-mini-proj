import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { HttpModule } from '@nestjs/axios';
import { TransactionsService } from '../transactions/transactions.service';
import walletDbConnectionProvider from '../database/providers/db_provider';
import { ConfigModule } from '@nestjs/config';
import WalletDBConfig from '../../db_config/db.config';

@Module({
  controllers: [OtpController],
  providers: [OtpService, TransactionsService, walletDbConnectionProvider],
  imports: [HttpModule, ConfigModule.forFeature(WalletDBConfig)],
  exports: [OtpService, walletDbConnectionProvider],
})
export class OtpModule {}
