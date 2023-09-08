import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [OtpController],
  providers: [OtpService],
  imports: [HttpModule],
})
export class OtpModule {}
