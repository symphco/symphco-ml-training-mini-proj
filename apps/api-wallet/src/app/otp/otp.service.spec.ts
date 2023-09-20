import { Test, TestingModule } from '@nestjs/testing';
import { OtpService } from './otp.service';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import { config } from '../../constant/config';
import { generateSignature } from '../utils/encrypt_service';
import { GenerateOtpBodyDto, ValidateOtpBodyDTO } from './otp.dto';
import { of, throwError } from 'rxjs';

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
    it('should validate the OTP and return the response data', async () => {
      const payload: ValidateOtpBodyDTO = {
        mobile_no: '12345678901',
        deviceID: 'device-id',
        pin: '1234',
        service_type: 'service-type',
        timelimit: 60,
        token: 'token-value',
      };

      const responseData = 1;
      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: responseData });

      const result = await otpService.validateOTP(payload);

      expect(axios.post).toHaveBeenCalledWith(
        config.OTP_URL + '/ValidateOTP',
        payload
      );
      expect(result).toEqual(responseData);
    });

    it('should throw an InternalServerErrorException if the OTP validation fails', async () => {
      const payload: ValidateOtpBodyDTO = {
        mobile_no: '12345678901',
        deviceID: 'device-id',
        pin: '1234',
        service_type: 'service-type',
        timelimit: 60,
        token: 'token-value',
      };

      const responseData = {
        code: 0,
      };

      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: responseData });

      await expect(otpService.validateOTP(payload)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  describe('generateOTP', () => {});

  describe('sendSMS', () => {
    it('should send an SMS and return the response data', async () => {
      const payload = {
        mobileno: '09123456789',
        msg: 'test-message',
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

      jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockResponse });

      const result = await otpService.sendSMS(payload);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining(process.env.SMS_BASEURL + '/sendSMS'),
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw InternalServerErrorException on error', async () => {
      const payload = {
        mobileno: '09091234567',
        msg: 'Error',
      };

      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(throwError(() => new Error('Network error')));

      await expect(otpService.sendSMS(payload)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
