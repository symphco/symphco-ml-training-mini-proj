import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { ConfigModule } from '@nestjs/config';
import sampleConnectionProvider from '../database/providers/db_provider';
import DB_Config from '../../db_config/db.config';

@Module({
  imports: [ConfigModule.forFeature(DB_Config)],
  exports: [sampleConnectionProvider],
  controllers: [TransactionsController],
  providers: [TransactionsService, sampleConnectionProvider],
})
export class TransactionsModule {}
