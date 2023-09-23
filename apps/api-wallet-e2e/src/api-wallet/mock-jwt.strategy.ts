import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'apps/api-wallet/src/app/auth/auth.service';

@Injectable()
export class MockJwtStrategy extends PassportStrategy(Strategy, 'mock-jwt') {
  constructor(private authService: AuthService) {
    super({});
  }

  async validate(payload: any) {
    // Implement your logic to validate the payload and return a user object
    return { id: payload.sub, username: payload.username };
  }
}
