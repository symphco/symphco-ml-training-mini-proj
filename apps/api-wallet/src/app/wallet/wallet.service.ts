import { Inject, Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';


@Injectable()
export class WalletService {
    constructor(@Inject('walletmini') private readonly databaseService: DatabaseService) {}
    getUsers() {

       const rc = this.databaseService.getQueryResult('getwallet_user', [1]);
       console.log(rc);

        return rc;


        // return []
    }
}
