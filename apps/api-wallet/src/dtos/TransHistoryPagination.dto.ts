import { IsNumber } from 'class-validator';

export class TransHistoryPaginationDto {
  @IsNumber()
  page?: number = 1;

  @IsNumber()
  limit?: number = 3;
}
