import { Module } from '@nestjs/common';
import sampleConnectionProvider from './database/providers/db_provider';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';
import DB_Config from '../db_config/db.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forFeature(DB_Config), AuthModule],
  exports: [sampleConnectionProvider],
  controllers: [],
  providers: [sampleConnectionProvider],
})
export class AppModule {}
