import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { ValidateOtpBodyDTO } from '../otp/otp.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';

const otp_url = process.env.OTP_BASEURL;
export class Validate {
  constructor(private httpService: HttpService) {}
  async validateOTP(payloadLoad: ValidateOtpBodyDTO) {
    console.log('hatdog', payloadLoad);
    return this.httpService
      .post(otp_url + '/ValidateOTP', payloadLoad)
      .pipe(
        map((res) => {
          console.log('/ValidateOTP', res);
          return res.data;
        })
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('Something went wrong');
        })
      );
  }
}
