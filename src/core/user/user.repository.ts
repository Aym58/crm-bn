import { InternalServerErrorException } from '@nestjs/common';

import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name } = createUserDto;
    const user = new UserEntity();
    user.name = name;

    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  },
});
