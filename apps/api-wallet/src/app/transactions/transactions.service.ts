import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';
import { TransactionDetailsDto } from '../../dtos/Transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}
  save() {
    return [];
  }
  async insert(trans_Details: TransactionDetailsDto) {
    const {
      sendermobileno,
      receivermobileno,
      amount,
      servicefee,
      servicetype,
    } = trans_Details;
    const user = await this.databaseService.getQueryResult(
      'insert_Transaction',
      [sendermobileno, receivermobileno, amount, servicefee, servicetype]
    );
    return user;
  }
}
