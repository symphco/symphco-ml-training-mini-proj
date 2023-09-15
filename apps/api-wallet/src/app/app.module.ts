import { Module } from '@nestjs/common';
import walletDbConnectionProvider from './database/providers/db_provider';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';
import DB_Config from '../db_config/db.config';
import { OtpModule } from './otp/otp.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forFeature(DB_Config),
    WalletModule,
    OtpModule,
    AuthModule,
    TransactionsModule,
  ],
  exports: [walletDbConnectionProvider],
  controllers: [],
  providers: [walletDbConnectionProvider],
})
export class AppModule {}
