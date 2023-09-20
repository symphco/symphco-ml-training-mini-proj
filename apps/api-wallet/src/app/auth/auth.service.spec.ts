import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { WalletService } from '../wallet/wallet.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from '../../dtos/LoginUser.dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let walletService: WalletService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: WalletService,
          useValue: {
            validate: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    walletService = module.get<WalletService>(WalletService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should generate a JWT token', async () => {
      const loginAuthDto: LoginAuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      const mockPayload = {
        username: loginAuthDto.username,
        sub: loginAuthDto.password,
      };
      const token = 'this-is-a-mock-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(loginAuthDto);

      expect(jwtService.sign).toHaveBeenCalledWith(mockPayload);
      expect(result).toEqual({ access_token: token });
      expect(walletService.validate).toHaveBeenCalledWith(
        mockPayload.username,
        mockPayload.sub
      );
    });
  });
});
