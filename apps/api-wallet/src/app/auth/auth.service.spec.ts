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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should call walletService.validate with the provided username and password', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      jest.spyOn(walletService, 'validate').mockResolvedValue(42);

      const result = await service.validateUser(username, password);

      expect(walletService.validate).toHaveBeenCalledWith(username, password);
      expect(result).toEqual(42);
    });

    it('should return null if walletService.validate returns falsy value', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      jest.spyOn(walletService, 'validate').mockResolvedValue(null);

      const result = await service.validateUser(username, password);

      expect(walletService.validate).toHaveBeenCalledWith(username, password);
      expect(result).toBeNull();
    });
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
