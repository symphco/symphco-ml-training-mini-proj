import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';
import { DbTransactions } from '../database/services/db_transaction.util';

import { OtpService } from '../otp/otp.service';
import {
  GenerateSMSBodyDto,
  TxnBodyDTO,
  ValidateOtpBodyDTO,
} from '../otp/otp.dto';
import axios from 'axios';
import { config } from '../../constant/config';

import { NotFoundError } from 'rxjs';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}
  private readonly validateOTP: OtpService;
  async insert(transDetails: TxnBodyDTO): Promise<any> {
    const {
      sendermobileno,
      receivermobileno,
      amount,
      servicefee,
      servicetype,
      pin,
      deviceID,
      timelimit,
      tokens,
    } = transDetails;

    const validatedetails: ValidateOtpBodyDTO = {
      mobile_no: sendermobileno,
      deviceID: deviceID,
      pin: pin,
      service_type: servicetype,
      timelimit: timelimit,
      token: tokens,
    };

    const { data: validateResponse } = await axios.post(
      config.OTP_URL + '/ValidateOTP',
      validatedetails
    );

    const { code: valCode, message: valMessage } = validateResponse;

    const valSuccess = 1;

    if (valCode !== valSuccess) {
      throw new HttpException(valMessage, HttpStatus.FORBIDDEN);
    }

    const transactionResponse = await DbTransactions.insertTransaction(
      this.databaseService,
      sendermobileno,
      receivermobileno,
      amount,
      servicefee,
      servicetype
    );

    const { respcode, respmessage: transMessage } = transactionResponse[0];

    const successTxn = 1;

    if (respcode !== successTxn) {
      throw new HttpException(transMessage, HttpStatus.FORBIDDEN);
    }

    const smspayload: GenerateSMSBodyDto = {
      mobileno: sendermobileno,
      msg: transMessage,
    };

    const payloadForsendSMS = {
      username: config.SMS_USERNAME,
      password: config.SMS_PASSWORD,
      ...smspayload,
      sender: 'MLWALLET',
    };

    const { data: smsResponse } = await axios.post(
      config.SMS_URL + '/sendSMS',
      payloadForsendSMS
    );

    const { code: smsCode } = smsResponse;

    const smsSuccesscode = '1';

    if (smsCode !== smsSuccesscode) {
      return {
        code: 0,
        message: 'Succesfully process Transaction but unable to send SMS',
        data: smsResponse,
      };
    }
    return { code: 1, message: 'Succesfully process Transaction ' };
  }

  async getMobile(mobile_num: string): Promise<string> {
    const userNumber: string = await this.databaseService.getQueryResult(
      'getMobileNums',
      [mobile_num]
    );
    return userNumber;
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
      currentPage: Number(page),
      transactions: paginatedTransactions,
      nextPage: hasNextPage
        ? `/transactions/get-transactions-and-paginate/${userID}/?page=${++page}&limit=${limit}`
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
