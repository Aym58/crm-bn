import { InternalServerErrorException } from '@nestjs/common';

import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { UserEntity } from '../user/user.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadEntity } from './lead.entity';

export const LeadRepository = dataSource.getRepository(LeadEntity).extend({
  async createLead(
    createLeadDto: CreateLeadDto,
    user: UserEntity,
  ): Promise<LeadEntity> {
    const { name, source, budget, nextTask, contact } = createLeadDto;

    const lead = new LeadEntity();
    lead.name = name;
    lead.source = source;
    lead.budget = budget;
    lead.task = nextTask;
    lead.contact = contact;
    lead.user = user;
    try {
      await lead.save();
      return lead;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  },

  async getAllLeads(): Promise<LeadEntity[]> {
    const query = this.createQueryBuilder('lead');
    query.leftJoin('lead.user', 'user');
    query.addOrderBy('lead.id', 'DESC');
    query.select([
      'lead.id',
      'lead.name',
      'lead.source',
      'lead.budget',
      'lead.task',
      'lead.contact',
      'lead.createDate',
      'user.email',
    ]);
    return query.getMany();
  },
});
