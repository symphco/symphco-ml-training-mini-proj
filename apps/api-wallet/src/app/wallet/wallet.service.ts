import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';

@Injectable()
export class WalletService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}
  getUsers() {
    const rc = this.databaseService.getQueryResult('getwallet_user', [1]);
    
    return rc;

    // return []
  }
}
