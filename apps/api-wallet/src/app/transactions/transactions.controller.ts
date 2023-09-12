import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import { TransactionDetailsDto } from '../../dtos/Transaction.dto';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @Post('add')
  insertTrans(@Body() trans_Details: TransactionDetailsDto): Promise<any> {
    return this.transactionService.insert(trans_Details);
  }

  @Get('get-transactions')
  getTransHistory(): Promise<any[] | undefined> {
    return this.transactionService.getHistory();
  }
}
