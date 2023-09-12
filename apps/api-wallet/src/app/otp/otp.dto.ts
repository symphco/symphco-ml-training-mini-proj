import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class GenerateOtpBodyDto {
  Mobileno: string;
  DeviceID: string;
  Date: string;
  ServiceType: string;
  Signature: string;
  timelimit: number;
}

export class GenerateSMSBodyDto {
  @IsNotEmpty()
  mobileno: string;
  @IsNotEmpty()
  msg: string;
}

export class ValidateOtpBodyDTO {
  mobile_no: string;
  deviceID: string;
  pin: string;
  service_type: string;
  timelimit: string;
  token: number;
}
