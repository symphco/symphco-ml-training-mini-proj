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
import {
  GenerateOtpBodyDto,
  GenerateSMSBodyDto,
  TxnBodyDTO,
  ValidateOtpBodyDTO,
} from './otp.dto';

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

  @Post('/validateInAppOTP')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  validateOTP(@Body() validateOtp: ValidateOtpBodyDTO) {
    console.log('/validateInAppOTP', validateOtp);
    return this.otpservice.validateOTP(validateOtp);
  }

  @Post('/sendSMS')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  sendSMS(@Body() sms: GenerateSMSBodyDto) {
    console.log('sms', sms);
    return this.otpservice.sendSMS(sms);
  }
}
