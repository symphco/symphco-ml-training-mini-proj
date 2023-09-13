import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
  @Post('add-transactions')
  insertTrans(@Body() trans_Details: TransactionDetailsDto): Promise<any> {
    return this.transactionService.insert(trans_Details);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-transactions')
  getTransHistory(): Promise<any[] | undefined> {
    return this.transactionService.getHistory();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-transactions/:userID')
  getTransHistoryByUser(
    @Param('userID', ParseIntPipe) userID: number
  ): Promise<any | undefined> {
    return this.transactionService.getHistoryByUser(userID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-transactions/:userID/:transID')
  getSpecificTrans(
    @Param('userID', ParseIntPipe) userID: number,
    @Param('transID', ParseIntPipe) transID: number
  ): Promise<any | undefined> {
    return this.transactionService.getSpecificTrans(userID, transID);
  }
}
