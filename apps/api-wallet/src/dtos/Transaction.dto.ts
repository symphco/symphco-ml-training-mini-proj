import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransactionDetailsDto {
  @IsNotEmpty()
  @IsString()
  sendermobileno: string;

  @IsNotEmpty()
  @IsString()
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
