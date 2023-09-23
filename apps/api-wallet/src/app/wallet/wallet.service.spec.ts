import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { DatabaseService } from '../database/services/db_service';
import { NotFoundException } from '@nestjs/common';

describe('WalletService', () => {
  let service: WalletService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: 'walletmini',
          useValue: {
            getQueryResult: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    databaseService = module.get<DatabaseService>('walletmini');
  });

  describe('getUsers', () => {
    it('should get active users', async () => {
      const is_active = 1;
      const queryResult = [
        {
          name: 'Richard',
          is_active: 1,
        },
        {
          name: 'Arce',
          is_active: 1,
        },
      ];
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce(queryResult);

      const result = await service.getActiveUsers();

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'getwallet_user',
        [is_active]
      );
      expect(result).toBe(queryResult);
    });

    it('should throw NotFoundException if no active users in DB', async () => {
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockRejectedValueOnce(new Error('No users found'));

      await expect(service.getActiveUsers()).rejects.toThrow(
        new NotFoundException('No users found')
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      jest
        .spyOn(service['databaseService'], 'getQueryResult')
        .mockResolvedValueOnce([
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
        ]);

      const result = await service.getAllUsers();

      expect(result).toEqual([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ]);
    });

    it('should throw NotFoundException if no users are found', async () => {
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockRejectedValueOnce(new Error('No users found'));

      await expect(service.getAllUsers()).rejects.toThrow(
        new NotFoundException('No users found')
      );
    });
  });

  describe('getUserById', () => {
    it('should get user by id', async () => {
      const id = 1;
      const queryResult = { id: 1, username: 'testuser' };
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce(queryResult);

      const result = await service.getUserById(id);

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'getUserById',
        [id]
      );
      expect(result).toEqual(queryResult);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const id = 1;
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce(undefined);

      await expect(service.getUserById(id)).rejects.toThrow(NotFoundException);
      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'getUserById',
        [id]
      );
    });
  });

  describe('validateUser', () => {
    it('should validate users during login', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const queryResult = [{ ckycid: 1 }];
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce(queryResult);

      const result = await service.validate(username, password);

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'validateUser',
        [username, password]
      );
      expect(result).toEqual(queryResult[0].ckycid);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const username = 'invaliduser';
      const password = 'invalidpassword';

      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce([{ ckycid: null }]);

      await expect(service.validate(username, password)).rejects.toThrow(
        NotFoundException
      );

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'validateUser',
        [username, password]
      );
    });
  });
});
