import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

import { TaskDto } from '../task/dto/tasks.dto';
import { UserEntity } from '../user/user.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { ResponseDtoCreate, ResponseDtoList } from './dto/response.dto';
import { ResponseMessage } from './enum/response.enum';
import { LeadEntity } from './lead.entity';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService {
  async CreateLead(
    createLeadDto: CreateLeadDto,
    user: UserEntity,
  ): Promise<ResponseDtoCreate> {
    const response: ResponseDtoCreate = {
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

  async getAllLeads(): Promise<ResponseDtoList> {
    const response: ResponseDtoList = {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessage.SUCCESS,
    };
    try {
      const leads = await LeadRepository.getAllLeads();
      response.data = leads;
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }

  async updateLeadTask(
    lead: LeadEntity,
    updateTaskDto: TaskDto,
  ): Promise<ResponseDtoCreate> {
    const response: ResponseDtoCreate = {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.TASK_UPDATE_SUCCEESS,
    };
    try {
      await LeadRepository.updateLeadTask(lead, updateTaskDto);
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }
}
