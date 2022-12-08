import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  getHello(): string {
    return 'User!!';
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = await UserRepository.createUser(createUserDto);

    return { name: user.name };
  }
}
