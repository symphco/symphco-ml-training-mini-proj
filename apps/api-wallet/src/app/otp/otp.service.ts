import axios, { AxiosInstance } from 'axios';
import { log } from 'console';
import {
  GenerateOtpBodyDto,
  GenerateSMSBodyDto,
  TransactionalBodyDto,
  TxnBodyDTO,
  ValidateOtpBodyDTO,
} from './otp.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { generateSignature } from '../utils/encrypt_service';
import { TransactionsService } from '../transactions/transactions.service';

const otp_url = process.env.OTP_BASEURL;
const username = process.env.OTP_USERNAME;
const password = process.env.OTP_PASSWORD;
export class OtpService {
  private readonly transactions: TransactionsService;
  constructor() {}

  public async validateOTP(payloadLoad: ValidateOtpBodyDTO): Promise<any> {
    const { data } = await axios.post(otp_url + '/ValidateOTP', payloadLoad);

    const { code, message, otp, name, token } = data;
    if (code !== 1) {
      throw new InternalServerErrorException();
    }
    return data;
  }

  public async generateOTP(payloadLoad: GenerateOtpBodyDto) {
    try {
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

      const { data } = await axios.post(
        otp_url + '/GetDetails',
        payloadForOtpService
      );

      return data;
    } catch (error) {
      throw new InternalServerErrorException
    }
  }
  async sendSMS(payloadLoad: GenerateSMSBodyDto) {
    try {
      const sms_url = process.env.SMS_BASEURL;
      const payloadForsendSMS = {
        username: process.env.SMS_USERNAME,
        password: process.env.SMS_PASSWORD,
        ...payloadLoad,
        sender: 'MLWALLET',
      };
      const { data: smsResponse } = await axios.post(
        sms_url + '/sendSMS',
        payloadForsendSMS
      );
      return smsResponse;
    } catch (error) {
      throw new InternalServerErrorException
    }
  }
}

