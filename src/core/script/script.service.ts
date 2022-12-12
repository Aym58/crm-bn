import { Injectable } from '@nestjs/common';

import { ScriptRepository } from './script.repository';
import { UserEntity } from '../user/user.entity';
import { CreateScriptDto } from './dto/create-script.dto';
import { ScriptDto } from './dto/script.dto';
import { UserScriptsDto } from './dto/user-scripts.dto';

@Injectable()
export class ScriptService {
  async CreateScript(
    createScriptDto: CreateScriptDto,
    user: UserEntity,
  ): Promise<ScriptDto> {
    const script = await ScriptRepository.createScript(createScriptDto, user);
    return {
      id: script.id,
      name: script.name,
      source: script.source,
      link: script.link,
      user: script.user.email,
    };
  }

  async getUserScripts(user: UserEntity): Promise<UserScriptsDto> {
    const scripts = await ScriptRepository.getUserScripts(user);
    return { scripts };
  }
}
