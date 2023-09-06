import { Module } from '@nestjs/common';
import sampleConnectionProvider from './database/providers/db_provider';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';
import DB_Config from '../db_config/db.config';
import { LoginAuthModule } from './auth/login-auth/login-auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/jwt/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forFeature(DB_Config),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Replace with desired expiration time
    }),
    WalletModule,
    LoginAuthModule,
  ],
  exports: [sampleConnectionProvider],
  controllers: [],
  providers: [sampleConnectionProvider],
})
export class AppModule {}
