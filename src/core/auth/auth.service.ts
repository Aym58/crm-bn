import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './dto/jwt.dto';
import { StatusDto } from './dto/status.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async register(userDto: CreateUserDto): Promise<StatusDto> {
    let status: StatusDto = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userService.createUser(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<StatusDto> {
    const user = await this.userService.findUser(loginUserDto);

    const token = this._createToken(user);

    return {
      username: user.email,
      ...token,
    };
  }

  private _createToken({ email }: UserDto): any {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: '90d',
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
