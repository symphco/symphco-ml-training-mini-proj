import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { WalletService } from '../wallet/wallet.service';
import { JwtService } from '@nestjs/jwt';

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
    it('should generate a JWT token using jwtService.sign', async () => {
      const user = { username: 'testuser', password: 'testpassword' };
      const token = 'mockedToken';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.password,
      });
      expect(result).toEqual({ access_token: token });
    });
  });
});
