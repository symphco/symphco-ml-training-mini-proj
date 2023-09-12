import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';
import { TransactionDetailsDto } from '../../dtos/Transaction.dto';
import { DbTransactions } from '../database/services/db_transaction.util';
@Injectable()
export class TransactionsService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}

  async insert(trans_Details: TransactionDetailsDto): Promise<any> {
    const {
      sendermobileno,
      receivermobileno,
      amount,
      servicefee,
      servicetype,
    } = trans_Details;

    const user = await DbTransactions.insertTransaction(
      this.databaseService,
      sendermobileno,
      receivermobileno,
      amount,
      servicefee,
      servicetype
    );
    return user;
  }

  async getMobile(mobile_num: string): Promise<string> {
    const u_num = await this.databaseService.getQueryResult('getMobileNums', [
      mobile_num,
    ]);
    return u_num;
  }

  async getHistory(): Promise<any[] | undefined> {
    const history = await this.databaseService.getQueryResult(
      'getAllHistoryTrans',
      []
    );
    return history;
  }

  async getHistoryByUser(
    id: number,
    page: number,
    limit: number
  ): Promise<any | undefined> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const u_history = await this.databaseService.getQueryResult(
      'history_transaction',
      [id]
    );
    const paginatedTransactions = u_history.slice(startIndex, endIndex);

    const nextPage = page + 1;
    const hasNextPage = endIndex < u_history.length;

    return {
      totalTransactions: u_history.length,
      currentPage: page,
      transactions: paginatedTransactions,
      nextPage: hasNextPage
        ? `/transactions/get-transactions/${id}/?page=${nextPage}&limit=${limit}`
        : null,
    };
  }
}
