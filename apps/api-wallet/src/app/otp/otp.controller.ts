import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { GenerateOtpBodyDto } from './otp.dto';

@Controller()
export class OtpController {
  constructor(private readonly otpservice: OtpService) {}

  @Post('/inAppOTP')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  inAppOTP(@Body() otp: GenerateOtpBodyDto) {
    console.log(otp);
    return this.otpservice.generateOTP(otp);
  }
}
