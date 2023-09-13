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
import { OtpService } from '../otp/otp.service';
import { Validate } from '../utils/validate_otp';
import { ValidateOtpBodyDTO } from '../otp/otp.dto';
@Injectable()
export class TransactionsService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}
  private readonly validate: Validate;
  async insert(trans_Details: TransactionDetailsDto): Promise<any> {
    const { sendermobileno, Deviceid, otp, servicetype, timelimit, token } =
      trans_Details;
    console.log({ trans_Details });

    const validatedetails:ValidateOtpBodyDTO = {
      mobile_no: sendermobileno,
      deviceID: Deviceid,
      pin: otp,
      service_type: servicetype,
      timelimit: timelimit,
      token: token,
    };
    console.log({ validatedetails });

    // const validateOTP = await this.otpservice?.validateOTP(validatedetails);
    const validateotp = this.validate?.validateOTP(validatedetails);
    console.log('VALIDATEOTP', validateotp);
    //const { code, message,operator } = validateOTP;

    // if (code == 1 && message == 'Valid') {
    //   console.log('VALIDATEOTP', validateOTP);
    //   const user = await DbTransactions.insertTransaction(
    //     this.databaseService,
    //     sendermobileno,
    //     receivermobileno,
    //     amount,
    //     servicefee,
    //     servicetype
    //   );
    //   return user;
    // }
    // else{
    //   return validateOTP;
    // }
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

  async getHistoryByUser(userID: number): Promise<any | undefined> {
    const u_history = await this.databaseService.getQueryResult(
      'history_transaction',
      [userID]
    );
    return u_history;
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
