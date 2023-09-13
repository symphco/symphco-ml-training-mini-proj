import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  isNotEmpty,
} from 'class-validator';

export class TransactionDetailsDto {
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
  otp: string;

  @IsNotEmpty()
  @IsString()
  Deviceid: string;

  @IsNotEmpty()
  @IsString()
  Date: string;

  @IsNotEmpty()
  @IsString()
  Signature: string;

  @IsNotEmpty()
  @IsNumber()
  timelimit: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}
