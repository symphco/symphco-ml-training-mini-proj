import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import { TransactionDetailsDto } from '../../dtos/Transaction.dto';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  saveTrans() {
    return this.transactionService.save();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('add')
  insertTrans(@Body() trans_Details: TransactionDetailsDto) {
    return this.transactionService.insert(trans_Details);
  }
}
