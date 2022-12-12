import { InternalServerErrorException } from '@nestjs/common';

import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { UserEntity } from '../user/user.entity';
import { CreateScriptDto } from './dto/create-script.dto';
import { ScriptEntity } from './script.entity';

export const ScriptRepository = dataSource.getRepository(ScriptEntity).extend({
  async createScript(
    createScriptDto: CreateScriptDto,
    user: UserEntity,
  ): Promise<ScriptEntity> {
    const { name, source, link } = createScriptDto;
    const script = new ScriptEntity();
    script.name = name;
    script.source = source;
    script.link = link;
    script.user = user;
    try {
      await script.save();
      return script;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  },

  async getUserScripts(user: UserEntity): Promise<ScriptEntity[]> {
    const query = this.createQueryBuilder('script');
    query.leftJoin('script.user', 'user');
    query.where(`user.id = ${user.id}`);
    query.addOrderBy('script.id', 'DESC');
    query.select([
      'script.id',
      'script.name',
      'script.source',
      'script.link',
      'user.email',
    ]);
    return query.getMany();
  },
});
