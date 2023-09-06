import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/services/db_service';
import { LoginAuthDto } from 'apps/api-wallet/src/dtos/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginAuthService {
  constructor(
    @Inject('walletmini') private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async loginUser(userCred: LoginAuthDto) {
    const { username, password } = userCred;
    if (!username || !password) throw new BadRequestException();

    const [{ ckycid }] = await this.databaseService.getQueryResult(
      'validateUser',
      [username, password]
    );
    if (!ckycid) throw new BadRequestException();
    const access_token = await this.jwtService.signAsync(ckycid);
    console.log(access_token);

    // return {
    //   access_token: await this.jwtService.signAsync(ckycid),
    // };
  }
}
