import axios from 'axios';
import {
  GenerateOtpBodyDto,
  GenerateSMSBodyDto,
  ValidateOtpBodyDTO,
} from './otp.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { generateSignature } from '../utils/encrypt_service';
import { config } from '../../constant/config';

export class OtpService {
  constructor() {}

  public async validateOTP(payloadLoad: ValidateOtpBodyDTO): Promise<any> {
    const { data } = await axios.post(
      config.OTP_URL + '/ValidateOTP',
      payloadLoad
    );

    const { code } = data;
    const validateOtpSuccessCode = 1;
    if (code !== validateOtpSuccessCode) {
      throw new InternalServerErrorException();
    }
    return data;
  }

  public async generateOTP(payloadLoad: GenerateOtpBodyDto) {
    try {
      const signature =
        config.OTP_USERNAME +
        '|' +
        config.OTP_PASSWORD +
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
      if (payloadLoad.Signature !== generated) {
        return;
      }
      const payloadForOtpService = {
        username: config.OTP_USERNAME,
        password: config.OTP_PASSWORD,
        ...payloadLoad,
        Signature: generated,
      };

      const { data } = await axios.post(
        config.OTP_URL + '/GetDetails',
        payloadForOtpService
      );

      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async sendSMS(payloadLoad: GenerateSMSBodyDto) {
    try {
      const sms_url = process.env.SMS_BASEURL;
      const payloadForsendSMS = {
        username: config.SMS_USERNAME,
        password: config.SMS_PASSWORD,
        ...payloadLoad,
        sender: 'MLWALLET',
      };
      const { data: smsResponse } = await axios.post(
        sms_url + '/sendSMS',
        payloadForsendSMS
      );
      return smsResponse;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
