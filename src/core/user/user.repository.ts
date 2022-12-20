import {
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { ERROR } from './enum/error.enum';

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password } = createUserDto;
    const inDatabase = await this.findOne({
      where: { email },
    });
    if (inDatabase) {
      throw new HttpException(ERROR.ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }

    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.password = password;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  },

  async getAllUsers(): Promise<UserEntity[]> {
    const query = this.createQueryBuilder('user');
    query.addOrderBy('user.id', 'DESC');
    query.select(['user.id', 'user.name', 'user.email']);
    return query.getMany();
  },

  async findUser({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        ERROR.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      throw new HttpException(
        ERROR.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  },
});
