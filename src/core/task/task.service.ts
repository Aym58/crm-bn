import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

import { ResponseMessage } from '../lead/enum/response.enum';
import { LeadStatus } from '../lead/enum/lead-status.enum';
import { LeadEntity } from '../lead/lead.entity';
import { LeadService } from '../lead/lead.service';
import { ResponseDto } from './dto/response.dto';
import { TaskList } from './dto/task-list.dto';
import { TasksEnum } from '../lead/enum/tasks.enum';
import { TaskFailureRate } from './dto/task-list.dto';

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
    const N = 86400000;
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.SUCCESS,
    };
    try {
      const { data } = await this.leadService.getAllLeads();

      const tasks: TaskList[] = [...data]
        .sort(
          (leadA, leadB) =>
            new Date(leadA.taskUpdateDate).getTime() -
            new Date(leadB.taskUpdateDate).getTime(),
        )
        .filter((lead) => lead.status === LeadStatus.IN_PROGRESS)
        .map((lead) => {
          return {
            id: lead.id,
            leadName: lead.name,
            task: lead.task,
            hold: Math.round(
              (Date.now() - Date.parse(lead.taskUpdateDate)) / N,
            ),
            user: lead.user.name,
          };
        });
      response.data = tasks;
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
      const tasks = [
        TasksEnum.BID,
        TasksEnum.CALL,
        TasksEnum.INVITE,
        TasksEnum.OFFER,
        TasksEnum.CLOSE,
      ];
      const { data } = await this.leadService.getAllLeads();
      const tasksFailed = data.filter(
        (lead) => lead.status === LeadStatus.FAIL,
      );
      const amountFailed = tasksFailed.length;
      const rateArr: TaskFailureRate[] = [];
      tasks.forEach((task) => {
        const rate =
          [...tasksFailed].filter((lead) => lead.task === task).length /
          amountFailed;
        rateArr.push({
          task,
          failureRate: Math.round(rate * 100),
        });
      });
      response.data = rateArr.sort(
        (taskA, taskB) => taskB.failureRate - taskA.failureRate,
      );
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
