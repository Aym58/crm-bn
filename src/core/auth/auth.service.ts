import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './dto/jwt.dto';
import { ResponseDto } from './dto/response.dto';
import { ResponseMessage } from './enum/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessage.REGISTRATION_SUCCESS,
    };
    try {
      await this.userService.createUser(userDto);
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }

  async login(loginUserDto: LoginUserDto): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.LOGIN_SUCCESS,
    };
    try {
      const user = await this.userService.findUser(loginUserDto);
      const token = this._createToken(user);
      response.data = { userId: user.id, token };
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }

  private _createToken({ email }: UserDto): any {
    const user: JwtPayload = { email };
    const token = this.jwtService.sign(user);
    return token;
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException(
        ResponseMessage.INVALID_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
