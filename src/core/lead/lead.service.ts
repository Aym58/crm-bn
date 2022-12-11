import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadDto } from './dto/lead.dto';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService {
  async CreateLead(
    createLeadDto: CreateLeadDto,
    user: UserEntity,
  ): Promise<LeadDto> {
    const lead = await LeadRepository.createLead(createLeadDto, user);

    return {
      id: lead.id,
      name: lead.name,
      source: lead.source,
      budget: lead.budget,
      nextTask: lead.task,
      contact: lead.contact,
      user: lead.user.email,
    };
  }
}
