import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

import { ResponseMessage } from '../lead/enum/response.enum';

import { LeadEntity } from '../lead/lead.entity';
import { LeadService } from '../lead/lead.service';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class TaskService {
  constructor(private readonly leadService: LeadService) {}

  async getLeadTask(lead: LeadEntity): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.SUCCESS,
      data: { id: lead.id, task: lead.task, status: lead.status },
    };
    return response;
  }

  async getTaskList(): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.SUCCESS,
    };
    try {
      const { data } = await this.leadService.getTaskList();
      response.data = data;
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }

  async getTaskFailureRate(): Promise<ResponseDto> {
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.SUCCESS,
    };
    try {
      const { data } = await this.leadService.getTaskFailureList();
      response.data = data;
    } catch (error) {
      response.statusCode = error.status;
      response.message = error.response;
    }
    return response;
  }

  async updateTask(lead, updateTaskDto): Promise<ResponseDto> {
    const response: ResponseDto = await this.leadService.updateLeadTask(
      lead,
      updateTaskDto,
    );
    return response;
  }
}
