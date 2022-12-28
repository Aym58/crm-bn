import { HttpStatus } from '@nestjs/common';
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
