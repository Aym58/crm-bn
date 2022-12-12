import { Controller, Get, Post, Body } from '@nestjs/common';

import { LoginDto } from '../auth/dto/login.dto';
import { AllUsersDto } from './dto/all-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers(): Promise<AllUsersDto> {
    return this.userService.getAllUsers();
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Post('find')
  async findUser(@Body() loginDto: LoginDto): Promise<UserDto> {
    return this.userService.findUser(loginDto);
  }
}
