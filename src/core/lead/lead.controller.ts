import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';

import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UserEntity } from '../user/user.entity';
import { GetUser } from '../user/decorator/getUser.decorator';
import { ResponseDtoCreate, ResponseDtoList } from './dto/response.dto';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async createLead(
    @Body(ValidationPipe) createLeadDto: CreateLeadDto,
    @GetUser() user: UserEntity,
  ): Promise<ResponseDtoCreate> {
    return await this.leadService.createLead(createLeadDto, user);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getallLeads(): Promise<ResponseDtoList> {
    return this.leadService.getAllLeads();
  }
}
