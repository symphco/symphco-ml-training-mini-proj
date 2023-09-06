import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginAuthService } from '../login-auth/login-auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: LoginAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Replace with your own secret key
    });
  }

  //   async validate(payload: JwtPayload) {
  //     const user = await this.authService.validateUserByJwt(payload);
  //     if (!user) {
  //       throw new UnauthorizedException();
  //     }
  //     return user;
  //   }
}
