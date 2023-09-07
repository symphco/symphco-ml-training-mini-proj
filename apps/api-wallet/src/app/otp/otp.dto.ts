import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class GenerateOtpDto {
  username: string;
  password: string;
  mobileno: string;
  deviceid: string;
  date: string;
  serviceType: string;
  signature?: string;
  timelimit: number;
}

export class GenerateOtpBodyDto {
  mobileno: string;
  deviceid: string;
  date: string;
  serviceType: string;
  signature: string;
  timelimit: number;
}
