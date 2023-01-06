import { InternalServerErrorException } from '@nestjs/common';

import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { TaskFailureRate } from '../task/dto/task-list.dto';
import { TaskDto } from '../task/dto/tasks.dto';
import { UserEntity } from '../user/user.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadStatus } from './enum/lead-status.enum';
import { TasksArray } from './enum/tasks.enum';
import { LeadEntity } from './lead.entity';

export const LeadRepository = dataSource.getRepository(LeadEntity).extend({
  async createLead(
    createLeadDto: CreateLeadDto,
    user: UserEntity,
  ): Promise<LeadEntity> {
    const { name, source, budget, task, contact } = createLeadDto;
    const lead = new LeadEntity();
    lead.name = name;
    lead.source = source;
    lead.budget = budget;
    lead.task = task;
    lead.contact = contact;
    lead.taskUpdateTime = Date.now();
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
      'lead.taskUpdateTime',
      'lead.contact',
      'lead.status',
      'user.email',
      'user.name',
    ]);

    return query.getMany();
  },

  async getTaskList(): Promise<LeadEntity[]> {
    try {
      const list = await this.createQueryBuilder('lead')
        .leftJoin('lead.user', 'user')
        .where('lead.status = :status', { status: LeadStatus.IN_PROGRESS })
        .addOrderBy('lead.taskUpdateTime', 'ASC')
        .select([
          'lead.id',
          'lead.name',
          'lead.task',
          'lead.taskUpdateTime',
          'user.name',
        ])
        .getMany();

      return list.map((lead) => {
        return {
          id: lead.id,
          leadName: lead.name,
          task: lead.task,
          hold: Math.round((Date.now() - lead.taskUpdateTime) / 86400000),
          user: lead.user.name,
        };
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  },

  async getTaskFailureList(): Promise<TaskFailureRate[]> {
    const rateArr: TaskFailureRate[] = [];

    try {
      const allFails = await this.createQueryBuilder('lead')
        .where('lead.status = :status', { status: LeadStatus.FAIL })
        .getCount();
      for (const task of TasksArray) {
        const failsByTask = await this.createQueryBuilder('lead')
          .where('lead.status = :status', { status: LeadStatus.FAIL })
          .where('lead.task = :task', { task: task })
          .getCount();
        rateArr.push({
          task,
          failureRate: Math.round((failsByTask / allFails) * 100),
        });
      }

      return rateArr.sort(
        (taskA, taskB) => taskB.failureRate - taskA.failureRate,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  },

  async updateLeadTask(lead: LeadEntity, updateTaskDto: TaskDto) {
    const { task, status } = updateTaskDto;
    if (task && task !== lead.task) {
      lead.task = task;
      lead.taskUpdateTime = Date.now();
    }
    if (status && status !== lead.status) {
      lead.status = status;
      lead.taskUpdateTime = Date.now();
    }

    try {
      await lead.save();
      return lead;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  },
});
