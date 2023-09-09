import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
    // const connection = await this.databaseService.startTransaction();
    // try {
    //   const [{ hasUser }] = await this.getMobile(sendermobileno);
    //   if (!hasUser) {
    //     throw new BadRequestException();
    //   }

    //   const user = await this.databaseService.getTransactionalQueryResult(
    //     connection,
    //     'insert_Transaction',
    //     [sendermobileno, receivermobileno, amount, servicefee, servicetype]
    //   );

    //   await connection.commit(); // Commit the transaction if everything is successful
    //   return user;
    // } catch (error) {
    //   await connection.rollback(); // Rollback the transaction if an error occurs
    //   throw error; // Rethrow the error to be handled by the caller
    // } finally {
    //   connection.release(); // Release the connection back to the pool
    // }
    const [{ hasUser }] = await this.getMobile(sendermobileno);
    if (!hasUser) {
      throw new BadRequestException();
    }
    const user = await this.databaseService.getQueryResult(
      'insert_Transaction',
      [sendermobileno, receivermobileno, amount, servicefee, servicetype]
    );

    return user;
  }

  async getMobile(mobile_num: string) {
    const u_num = await this.databaseService.getQueryResult('getMobileNums', [
      mobile_num,
    ]);
    return u_num;
  }
}
