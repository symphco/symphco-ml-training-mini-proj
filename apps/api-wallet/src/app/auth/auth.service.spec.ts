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

  describe('validateUser', () => {
    it('should validate user', async () => {
      const id = 1;
      const user = {
        id,
        username: 'Richard',
        password: 'ichad123',
      };

      const { username, password } = user;
      jest.spyOn(walletService, 'validateUser').mockResolvedValue(id);

      const result = await service.login(user);

      expect(walletService.validateUser).toHaveBeenCalledWith(
        username,
        password
      );
      expect(result).toEqual(user.id);
    });

    it('should return null if returns falsy value', async () => {
      const user = {
        username: 'Richard',
        password: 'ichad123',
      };

      const { username, password } = user;
      jest.spyOn(walletService, 'validateUser').mockResolvedValue(null);

      const result = await service.login(user);

      expect(walletService.validateUser).toHaveBeenCalledWith(
        username,
        password
      );
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
