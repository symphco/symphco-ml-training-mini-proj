import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';

@Injectable()
export class WalletService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}

  getActiveUsers() {
    const rc = this.databaseService.getQueryResult('getwallet_user', [1]);
    return rc;
  }

  get_Users(): Promise<any[] | undefined> {
    return this.databaseService.getQueryResult('getUsers', []);
  }

  async getUserById(id: number): Promise<any | undefined> {
    const hasUser = await this.databaseService.getQueryResult('getUserById', [
      id,
    ]);
    if (!hasUser) throw new UnauthorizedException();
    return hasUser;
  }

  async validate(username: string, password: string): Promise<number> {
    const [{ ckycid }] = await this.databaseService.getQueryResult(
      'validateUser',
      [username, password]
    );
    if (!ckycid) throw new NotFoundException();

    return;
  }
}
