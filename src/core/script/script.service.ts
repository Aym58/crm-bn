import { HttpStatus, Injectable } from '@nestjs/common';

import { ScriptRepository } from './script.repository';
import { UserEntity } from '../user/user.entity';
import { CreateScriptDto } from './dto/create-script.dto';
import { ResponseDto } from './dto/response.dto';
import { ResponseMessage } from './enum/response.enum';

@Injectable()
export class ScriptService {
  async createScript(
    createScriptDto: CreateScriptDto,
    user: UserEntity,
  ): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessage.CREATE_SUCCESS,
    };
    try {
      await ScriptRepository.createScript(createScriptDto, user);
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }

  async getUserScripts(user: UserEntity): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.SUCCESS,
    };
    try {
      const scripts = await ScriptRepository.getUserScripts(user);
      response.data = scripts;
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }
}
