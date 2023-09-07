import { ForbiddenException, Injectable } from '@nestjs/common';
import { GenerateOtpBodyDto } from './otp.dto';
import { catchError, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OtpService {
  constructor(private httpService: HttpService) {}

  async generateOTP(payloadLoad: GenerateOtpBodyDto) {
    const otp_url = process.env.OTP_BASEURL;
    const payloadForOtpService = {
      username: process.env.OTP_USERNAME,
      password: process.env.OTP_PASSWORD,
      ...payloadLoad,
      Signature:
        'f5678d5751a1732a2485b92ecdf0bf83bfe1375e4f6ff99a4cbb17d5a9df8c656abb9bae4c9d9680b2df6590a58ab48257277fe124743bd6c9a615eae9627717',
    };
    console.log('Otp service payload', payloadForOtpService);
    console.log('Otp service payload', payloadForOtpService);
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
}
