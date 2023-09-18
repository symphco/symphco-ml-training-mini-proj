import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { config } from '../../constant/config';

describe('OtpService', () => {
  let otpService: OtpService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    otpService = moduleRef.get<OtpService>(OtpService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  describe('validateOTP', () => {
    it('should validate OTP and return data', async () => {
      const payloadLoad = {
        mobile_no: '1234567890',
        deviceID: 'device123',
        pin: '1234',
        service_type: 'SEND',
        timelimit: 5,
        token: '  sha152',
      };

      const expectedResponse = {
        code: 1,
      };

      const mockResponse: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
        data: expectedResponse,
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));
      const result = await otpService.validateOTP(payloadLoad);

      expect(result).toEqual(expectedResponse);
      expect(httpService.post).toHaveBeenCalledWith(
        process.env.OTP_BASEURL + '/ValidateOTP',
        payloadLoad
      );
    });

    it('should throw InternalServerErrorException on error', async () => {
      const payloadLoad = {
        mobile_no: '1234567890',
        deviceID: 'device123',
        pin: '1234',
        service_type: 'SEND',
        timelimit: 5,
        token: '  sha152',
      };

      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(throwError(() => new Error('Network error')));

      await expect(otpService.validateOTP(payloadLoad)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('generateOTP', () => {
    it('should generate OTP and return data', async () => {
      const payloadLoad = {
        Mobileno: '1234567890',
        DeviceID: 'device123',
        Date: '2023-09-16',
        ServiceType: 'SEND',
        Signature: 'my-signature-sha152',
        timelimit: 5,
      };

      const expectedResponse = {
        status: 'success',
        message: 'OTP generated successfully',
        otp: '123456',
        expirationDate: '2023-09-16T12:00:00Z',
      };

      const mockResponse: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
        data: expectedResponse,
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

      const username = 'sabel';
      const password = 'sabel123';

      const result = await otpService.generateOTP(payloadLoad);

      expect(result).toEqual(expectedResponse);
      expect(httpService.post).toHaveBeenCalledWith(
        process.env.OTP_BASEURL + '/GetDetails',
        {
          username,
          password,
          ...payloadLoad,
          Signature: 'my-signature-sha152',
        }
      );
    });

    it('should throw InternalServerErrorException on error', async () => {
      const payloadLoad = {
        Mobileno: '1234567890',
        DeviceID: 'device123',
        Date: '2023-09-16',
        ServiceType: 'SEND',
        timelimit: 5,
        Signature: 'my-signature-sha152',
      };

      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(throwError(() => new Error('Network error')));

      await expect(otpService.generateOTP(payloadLoad)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('sendSMS', () => {
    it('should send SMS and returndata', async () => {
      const payloadLoad = {
        mobileno: 'dsgfdg',
        msg: '',
      };

      const expectedResponse = {};

      const mockResponse: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
        data: expectedResponse,
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

      process.env.SMS_BASEURL = 'http://your-sms-service-url';

      const result = await otpService.sendSMS(payloadLoad);

      expect(result).toEqual(expectedResponse);
      expect(httpService.post).toHaveBeenCalledWith(
        'http://your-sms-service-url/sendSMS',
        {
          username: config.SMS_USERNAME,
          password: config.SMS_PASSWORD,
          ...payloadLoad,
          sender: 'MLWALLET',
        }
      );
    });

    it('should throw InternalServerErrorException on error', async () => {
      const payloadLoad = {
        mobileno: 'dsgfdg',
        msg: '',
      };

      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(throwError(() => new Error('Network error')));

      await expect(otpService.sendSMS(payloadLoad)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
