import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../user/decorator/getUser.decorator';
import { UserEntity } from '../user/user.entity';
import { CreateScriptDto } from './dto/create-script.dto';
import { ResponseDto } from './dto/response.dto';
import { ScriptService } from './script.service';

@Controller('script')
export class ScriptController {
  constructor(private scriptService: ScriptService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async createScript(
    @Body(ValidationPipe) createScriptDto: CreateScriptDto,
    @GetUser() user: UserEntity,
  ): Promise<ResponseDto> {
    return await this.scriptService.CreateScript(createScriptDto, user);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getallLeads(@GetUser() user: UserEntity): Promise<ResponseDto> {
    return this.scriptService.getUserScripts(user);
  }
}
