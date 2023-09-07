import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  Post,
} from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';

@Injectable()
export class WalletService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}

  get_Users(): Promise<any[] | undefined> {
    return this.databaseService.getQueryResult('getUsers', []);
  }

  async getUserById(id: number): Promise<any | undefined> {
    const hasUser = await this.databaseService.getQueryResult('getUserById', [
      id,
    ]);
    console.log(hasUser);

    // if (!hasUser) throw new BadRequestException();
    return hasUser;
  }

  async validate(username: string, password: string) {
    const [{ ckycid }] = await this.databaseService.getQueryResult(
      'validateUser',
      [username, password]
    );

    return ckycid;
  }
}
