import { HttpStatus } from '@nestjs/common';
import { TaskFailureRate } from 'src/core/task/dto/task-list.dto';
import { LeadsDto } from './all-leads.dto';
import { LeadDto } from './lead.dto';

export interface ResponseDtoLead {
  statusCode: HttpStatus;
  message: string;
  data?: LeadDto;
}

export interface ResponseDtoList {
  statusCode: HttpStatus;
  message: string;
  data?: LeadsDto[];
}

export interface ResponseDtoCreate {
  statusCode: HttpStatus;
  message: string;
}

export interface ResponseDtoFailureRate {
  statusCode: HttpStatus;
  message: string;
  data?: TaskFailureRate[];
}
