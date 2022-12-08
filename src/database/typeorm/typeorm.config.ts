import { ConfigService } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

import { AuthEntity } from 'src/core/auth/auth.entity';
import { UserEntity } from 'src/core/user/user.entity';

config();

const configService = new ConfigService();

const Entities = [UserEntity, AuthEntity];

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_URL'),
  entities: Entities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: true,
};
