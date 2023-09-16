import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { DatabaseService } from '../database/services/db_service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should call databaseService.getQueryResult with the correct parameters', async () => {
      const queryResult = 'mockedQueryResult';
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce(queryResult);

      const result = await service.getUsers();

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'getwallet_user',
        [1]
      );
      expect(result).toBe(queryResult);
    });
  });

  describe('get_Users', () => {
    it('should call databaseService.getQueryResult with the correct parameters', async () => {
      const queryResult = ['user1', 'user2'];
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce(queryResult);

      const result = await service.get_Users();

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'getUsers',
        []
      );
      expect(result).toEqual(queryResult);
    });
  });

  describe('getUserById', () => {
    it('should call databaseService.getQueryResult with the correct parameters', async () => {
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

    it('should throw UnauthorizedException if user does not exist', async () => {
      const id = 1;
      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValueOnce(undefined);

      await expect(service.getUserById(id)).rejects.toThrow(
        UnauthorizedException
      );
      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'getUserById',
        [id]
      );
    });
  });

  describe('validate', () => {
    it('should call databaseService.getQueryResult with the correct parameters and return ckycid', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const queryResult = [{ ckycid: 123 }];
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
  });
});
