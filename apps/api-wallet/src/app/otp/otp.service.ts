import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  GenerateOtpBodyDto,
  GenerateSMSBodyDto,
  ValidateOtpBodyDTO,
} from './otp.dto';
import { catchError, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { generateSignature } from '../utils/encrypt_service';

const username = process.env.OTP_USERNAME;
const password = process.env.OTP_PASSWORD;
const otp_url = process.env.OTP_BASEURL;
@Injectable()
export class OtpService {
  constructor(private httpService: HttpService) {}

  async generateOTP(payloadLoad: GenerateOtpBodyDto) {
    const signature =
      username +
      '|' +
      password +
      '|' +
      payloadLoad.Mobileno +
      '|' +
      payloadLoad.DeviceID +
      '|' +
      payloadLoad.Date +
      '|' +
      payloadLoad.ServiceType +
      '|' +
      payloadLoad.timelimit;
    const generated = generateSignature(signature);
    console.log('Generated', generated);
    if (payloadLoad.Signature !== generated) {
      console.log('not equal');
      return;
    }
    const payloadForOtpService = {
      username,
      password,
      ...payloadLoad,
      Signature: generated,
    };
    return this.httpService
      .post(otp_url + '/GetDetails', payloadForOtpService)

      .pipe(
        map((res) => {
          return res.data;
        })
      )

      .pipe(
        catchError(() => {
          throw new ForbiddenException('Something went wrong');
        })
      );
  }
  // async validateOTP(payloadLoad: ValidateOtpBodyDTO) {
  //   console.log('hatdog', payloadLoad);
  //   return this.httpService
  //     .post(otp_url + '/ValidateOTP', payloadLoad)
  //     .pipe(
  //       map((res) => {
  //         console.log('/ValidateOTP', res);
  //         return res.data;
  //       })
  //     )

  //     .pipe(
  //       catchError(() => {
  //         throw new ForbiddenException('Something went wrong');
  //       })
  //     );
  // }
  async sendSMS(payloadLoad: GenerateSMSBodyDto) {
    const sms_url = process.env.SMS_BASEURL;
    const payloadForsendSMS = {
      username: process.env.SMS_USERNAME,
      password: process.env.SMS_PASSWORD,
      ...payloadLoad,
      sender: 'MLWALLET',
    };
    return this.httpService
      .post(sms_url + '/sendSMS', payloadForsendSMS)

      .pipe(
        map((res) => {
          return res.data;
        })
      )

      .pipe(
        catchError(() => {
          console.log('error', ForbiddenException);
          throw new ForbiddenException('Something went wrong');
        })
      );
  }
}
