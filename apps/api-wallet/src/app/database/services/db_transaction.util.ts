import { DatabaseService } from './db_service';

export class DbTransactions {
  public static async insertTransaction(
    databaseService: DatabaseService,
    senderMobileNo: string,
    receiverMobileNo: string,
    amount: number,
    serviceFee: number,
    serviceType: string
  ): Promise<any> {
    const connection = await databaseService.startTransaction();

    try {
      const user = await databaseService.getQueryResult('insert_Transaction', [
        senderMobileNo,
        receiverMobileNo,
        amount,
        serviceFee,
        serviceType,
      ]);

      await connection.commit();
      return user;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
