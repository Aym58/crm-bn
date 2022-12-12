import { Body, Controller, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadDto } from './dto/lead.dto';

import { CreateLeadDto } from './dto/create-lead.dto';
import { UserEntity } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';

import { GetUser } from '../user/decorator/getUser.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AllLeadsDto } from './dto/all-leads.dto';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  async createLead(
    @Body(ValidationPipe) createLeadDto: CreateLeadDto,
    @GetUser() user: UserEntity,
  ): Promise<LeadDto> {
    return await this.leadService.CreateLead(createLeadDto, user);
  }

  @Get('all')
  async getallLeads(): Promise<AllLeadsDto> {
    return this.leadService.getAllLeads();
  }
}
