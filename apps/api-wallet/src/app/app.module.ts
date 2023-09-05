import { Module } from '@nestjs/common';
import sampleConnectionProvider from './database/providers/db_provider';
import { ConfigModule } from '@nestjs/config';
import DB_Config from '../db_config/DB_Config';

@Module({
  imports: [ConfigModule.forFeature(DB_Config)],
  exports: [sampleConnectionProvider],
  controllers: [],
  providers: [sampleConnectionProvider],
})
export class AppModule {}
