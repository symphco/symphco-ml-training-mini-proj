import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WalletModule } from '../wallet/wallet.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';
import { ConfigModule } from '@nestjs/config';
import DB_Config from '../../db_config/db.config';
import { WalletService } from '../wallet/wallet.service';

@Module({
  imports: [
    ConfigModule.forFeature(DB_Config),
    WalletModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, WalletService],
  controllers: [AuthController],
})
export class AuthModule {}