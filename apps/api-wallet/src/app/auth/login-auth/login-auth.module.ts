import { Module } from '@nestjs/common';
import { LoginAuthController } from './login-auth.controller';
import { LoginAuthService } from './login-auth.service';
import { ConfigModule } from '@nestjs/config';
import sampleConnectionProvider from '../../database/providers/db_provider';
import DB_Config from 'apps/api-wallet/src/db_config/db.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forFeature(DB_Config),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [sampleConnectionProvider],
  controllers: [LoginAuthController],
  providers: [LoginAuthService, sampleConnectionProvider],
})
export class LoginAuthModule {}
