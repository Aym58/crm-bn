import { Injectable } from '@nestjs/common';

import { AllUsersDto } from './dto/all-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await UserRepository.createUser(createUserDto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      registeredAt: user.registeredAt,
    };
  }

  async getAllUsers(): Promise<AllUsersDto> {
    const users = await UserRepository.getAllUsers();
    return { users };
  }

  async findUser(loginUserDto: LoginUserDto): Promise<UserDto> {
    const user = await UserRepository.findUser(loginUserDto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      registeredAt: user.registeredAt,
    };
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    const user = await UserRepository.findOne({ where: { email } });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      registeredAt: user.registeredAt,
    };
  }
}
