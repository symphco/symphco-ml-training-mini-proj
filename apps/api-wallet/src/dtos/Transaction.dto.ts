import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

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
}
