import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WalletModule } from '../wallet/wallet.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './jwt-config/local.auth';
import { ConfigModule } from '@nestjs/config';
import DB_Config from '../../db_config/db.config';
import { WalletService } from '../wallet/wallet.service';
import { JwtStrategy } from './jwt-config/jwt.strategy';
import { TransactionsService } from '../transactions/transactions.service';
import { OtpService } from '../otp/otp.service';

@Module({
  imports: [
    ConfigModule.forFeature(DB_Config),
    WalletModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXP },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    WalletService,
    JwtStrategy,
    TransactionsService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
