import { IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  @Length(11)
  mobile_no: string;

  @IsNotEmpty()
  @IsString()
  deviceID: string;

  @IsNotEmpty()
  @IsString()
  pin: string;

  @IsNotEmpty()
  @IsString()
  service_type: string;

  @IsNotEmpty()
  @IsNumber()
  timelimit: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class TransactionalBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(11)
  sendermobileno: string;

  @IsNotEmpty()
  @IsString()
  @Length(11)
  receivermobileno: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  servicefee: number;

  @IsNotEmpty()
  @IsString()
  servicetype: string;
}
export class TxnBodyDTO {
  @IsNotEmpty()
  @IsString()
  @Length(11)
  sendermobileno: string;

  @IsNotEmpty()
  @IsString()
  @Length(11)
  receivermobileno: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  servicefee: number;

  @IsNotEmpty()
  @IsString()
  servicetype: string;

  @IsNotEmpty()
  @IsString()
  pin: string;

  @IsNotEmpty()
  @IsString()
  deviceID: string;

  @IsNotEmpty()
  @IsNumber()
  timelimit: number;

  @IsNotEmpty()
  @IsString()
  tokens: string;
}
