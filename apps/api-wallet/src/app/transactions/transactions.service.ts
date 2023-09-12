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
}
