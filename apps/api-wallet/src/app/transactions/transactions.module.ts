import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { ConfigModule } from '@nestjs/config';
import DB_Config from '../../db_config/db.config';
import walletDbConnectionProvider from '../database/providers/db_provider';

@Module({
  imports: [ConfigModule.forFeature(DB_Config)],
  exports: [walletDbConnectionProvider],
  controllers: [TransactionsController],
  providers: [TransactionsService, walletDbConnectionProvider],
})
export class TransactionsModule {}
