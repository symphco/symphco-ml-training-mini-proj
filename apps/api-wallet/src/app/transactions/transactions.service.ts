import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';
import { TransactionDetailsDto } from '../../dtos/Transaction.dto';
import { DbTransactions } from '../database/services/db_transaction.util';
import { NotFoundError } from 'rxjs';
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
    userID: number,
    page: number,
    limit: number
  ): Promise<any | undefined> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const userHistory = await this.databaseService.getQueryResult(
      'history_transaction',
      [userID]
    );

    if (!userHistory.length) throw new NotFoundException();

    const paginatedTransactions = userHistory.slice(startIndex, endIndex);

    const hasNextPage = endIndex < userHistory.length;

    return {
      totalTransactions: userHistory.length,
      currentPage: +page++,
      transactions: paginatedTransactions,
      nextPage: hasNextPage
        ? `/transactions/get-transactions-and-paginate/${userID}/?page=${page}&limit=${limit}`
        : null,
    };
  }

  async getSpecificTrans(
    userID: number,
    transID: number
  ): Promise<any | undefined> {
    const [spec_trans] = await this.databaseService.getQueryResult(
      'getSpecificTrans',
      [userID, transID]
    );
    if (!spec_trans) throw new NotFoundException();

    return spec_trans;
  }
}
