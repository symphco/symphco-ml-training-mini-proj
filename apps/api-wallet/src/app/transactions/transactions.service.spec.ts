import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { DatabaseService } from '../database/services/db_service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: 'walletmini',
          useValue: {
            getQueryResult: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    databaseService = module.get<DatabaseService>('walletmini');
  });

  describe('getHistoryByUser', () => {
    it('should return paginated transaction history for a user', async () => {
      const userID = 1;
      const page = 1;
      const limit = 10;

      const userHistory = [
        { id: 1, amount: 100 },
        { id: 2, amount: 200 },
      ];

      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValue(userHistory);

      const result = await service.getHistoryByUser(userID, page, limit);

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'history_transaction',
        [userID]
      );
      expect(result.totalTransactions).toBe(userHistory.length);
      expect(result.currentPage).toBe(page);
      expect(result.transactions).toEqual(userHistory.slice(0, limit));
      expect(result.nextPage).toBeDefined();
    });

    it('should throw NotFoundException when user history is empty', async () => {
      const userID = 1;
      const page = 1;
      const limit = 10;

      jest.spyOn(databaseService, 'getQueryResult').mockResolvedValue([]);

      await expect(
        service.getHistoryByUser(userID, page, limit)
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getSpecificTrans', () => {
    it('should get specefic transaction', async () => {
      const id = 1;
      const trans_id = 101;

      const transaction = {
        id,
        trans_id,
        name: 'transaction 1',
      };

      jest
        .spyOn(databaseService, 'getQueryResult')
        .mockResolvedValue([transaction]);

      const result = await service.getSpecificTrans(id, trans_id);

      expect(databaseService.getQueryResult).toHaveBeenCalledWith(
        'getSpecificTrans',
        [id, trans_id]
      );
      expect(result).toBe(transaction);
    });

    it('should throw not found exception when no transaction', async () => {
      const id = 1;
      const trans_id = 101;

      jest.spyOn(databaseService, 'getQueryResult').mockResolvedValue([]);

      await expect(service.getSpecificTrans(id, trans_id)).rejects.toThrowError(
        NotFoundException
      );
    });
  });
});
