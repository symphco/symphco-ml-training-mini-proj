import { Inject, Injectable, Logger, Post } from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';

@Injectable()
export class WalletService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}
  //   getUsers() {
  //     const rc = this.databaseService.getQueryResult('getwallet_user', [1]);
  //     console.log(rc);

  //     return rc;

  //     // return []
  //   }

  getUsers2(): Promise<any[] | undefined> {
    return this.databaseService.getQueryResult('getUsers', []);
  }

  async getUser(username: string, password: string) {
    const hasUser = await this.databaseService.getQueryResult('validateUser', [
      username,
      password,
    ]);
    console.log(hasUser);

    return hasUser;
  }
}
