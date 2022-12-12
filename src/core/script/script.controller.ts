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
import { ScriptDto } from './dto/script.dto';
import { UserScriptsDto } from './dto/user-scripts.dto';
import { ScriptService } from './script.service';

@Controller('script')
export class ScriptController {
  constructor(private scriptService: ScriptService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async createScript(
    @Body(ValidationPipe) createScriptDto: CreateScriptDto,
    @GetUser() user: UserEntity,
  ): Promise<ScriptDto> {
    return await this.scriptService.CreateScript(createScriptDto, user);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getallLeads(@GetUser() user: UserEntity): Promise<UserScriptsDto> {
    return this.scriptService.getUserScripts(user);
  }
}
