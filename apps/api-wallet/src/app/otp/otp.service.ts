import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OtpService {
  getOTP() {
    // const otp_url = process.env.OTP_BASEURL;
    // const username = process.env.OTP_USERNAME;
    // const password = process.env.OTP_PASSWORD;
    return 'hello world';
  }
}
