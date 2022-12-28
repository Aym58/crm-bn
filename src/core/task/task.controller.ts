import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { Body, Patch, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

import { GetLead } from '../lead/decorator/lead.decorator';
import { LeadGuard } from '../lead/guard/lead.guard';
import { LeadEntity } from '../lead/lead.entity';
import { ResponseDto } from './dto/response.dto';
import { TaskDto } from './dto/tasks.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('list')
  @UseGuards(AuthGuard())
  async GetTaskList(): Promise<ResponseDto> {
    return this.taskService.getTaskList();
  }

  @Get('failure-rate')
  @UseGuards(AuthGuard())
  async GetTaskFailureRate(): Promise<ResponseDto> {
    return this.taskService.getTaskFailureRate();
  }

  @Get(':leadId')
  @UseGuards(AuthGuard(), LeadGuard)
  async GetTask(@GetLead() lead: LeadEntity): Promise<ResponseDto> {
    return this.taskService.getLeadTask(lead);
  }

  @Patch(':leadId')
  @UseGuards(AuthGuard(), LeadGuard)
  async GetPostList(
    @GetLead() lead: LeadEntity,
    @Body(ValidationPipe) updateTaskDto: TaskDto,
  ): Promise<ResponseDto> {
    return this.taskService.updateTask(lead, updateTaskDto);
  }
}
