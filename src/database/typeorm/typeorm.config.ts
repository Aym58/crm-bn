import { ConfigService } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

import { UserEntity } from 'src/core/user/user.entity';
import { LeadEntity } from 'src/core/lead/lead.entity';
import { ScriptEntity } from 'src/core/script/script.entity';

config();

const configService = new ConfigService();

const Entities = [UserEntity, LeadEntity, ScriptEntity];

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_URL'),
  entities: Entities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: true,
};
