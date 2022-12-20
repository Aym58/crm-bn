import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { UserEntity } from '../user/user.entity';
import { AllLeadsDto } from './dto/all-leads.dto';
import { CreateLeadDto } from './dto/create-lead.dto';

import { ResponseDto } from './dto/response.dto';
import { ResponseMessage } from './enum/response.enum';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService {
  async CreateLead(
    createLeadDto: CreateLeadDto,
    user: UserEntity,
  ): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessage.CREATE_SUCCESS,
    };
    try {
      await LeadRepository.createLead(createLeadDto, user);
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }

  async getAllLeads(): Promise<AllLeadsDto> {
    const leads = await LeadRepository.getAllLeads();
    return { leads };
  }
}
