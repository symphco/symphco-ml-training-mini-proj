import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { GenerateOtpBodyDto, GenerateSMSBodyDto } from './otp.dto';

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

  @Post('/sendotp')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  sendSMS(@Body() sms: GenerateSMSBodyDto) {
    console.log('sms', sms);
    return this.otpservice.sendSMS(sms);
  }
  @Get('/gethello')
  gethello(): string {
    return this.otpservice.gethello();
  }
}
