import { LeadStatus } from 'src/core/lead/enum/lead-status.enum';
import { TasksEnum } from 'src/core/lead/enum/tasks.enum';

export interface LeadDto {
  id: number;
  name: string;
  source: string;
  budget: string;
  task: TasksEnum;
  taskUpdateDate: Date;
  status: LeadStatus;
  contact: string;
  user: string;
}

export interface TaskDto {
  id: number;
  task: TasksEnum;
  status: LeadStatus;
  taskUpdateDate?: Date;
}
