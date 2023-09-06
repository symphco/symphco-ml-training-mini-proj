import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/services/db_service';
import { LoginAuthDto } from 'apps/api-wallet/src/dtos/LoginUser.dto';

@Injectable()
export class LoginAuthService {
  constructor(@Inject('walletmini') private databaseService: DatabaseService) {}

  async loginUser(userCred: LoginAuthDto) {
    const { username, password } = userCred;
    if (!username || !password) throw new BadRequestException();

    const { userId } = await this.databaseService.getQueryResult(
      'validateUser',
      [username, password]
    );

    if (!userId) throw new BadRequestException();
  }
}
