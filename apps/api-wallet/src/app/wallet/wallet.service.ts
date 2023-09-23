import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/services/db_service';

@Injectable()
export class WalletService {
  constructor(
    @Inject('walletmini') private readonly databaseService: DatabaseService
  ) {}

  async getActiveUsers(): Promise<any[] | null> {
    try {
      const activeUsers = await this.databaseService.getQueryResult(
        'getwallet_user',
        [1]
      );

      if (!activeUsers)
        throw new NotFoundException('There is no active users!');

      return activeUsers;
    } catch (error) {
      throw error;
    }
  }

  getAllUsers(): Promise<any[] | undefined> {
    try {
      const users = this.databaseService.getQueryResult('getUsers', []);

      if (!users) throw new NotFoundException('There are no users yet!');

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<any | undefined> {
    try {
      const hasUser = await this.databaseService.getQueryResult('getUserById', [
        id,
      ]);

      if (!hasUser) throw new NotFoundException('User not found!');

      return hasUser;
    } catch (error) {
      throw error;
    }
  }

  async validate(username: string, password: string): Promise<number> {
    try {
      const [{ ckycid }] = await this.databaseService.getQueryResult(
        'validateUser',
        [username, password]
      );

      if (!ckycid) throw new NotFoundException('User not Found!');

      return ckycid;
    } catch (error) {
      throw error;
    }
  }
}
