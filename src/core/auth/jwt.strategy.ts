import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt.dto';

config();
const configService = new ConfigService();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SEKRET_KEY'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
