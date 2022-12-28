import { LeadStatus } from '../enum/lead-status.enum';
import { TasksEnum } from '../enum/tasks.enum';

export interface LeadsDto {
  id: number;
  name: string;
  source: string;
  budget: string;
  task: TasksEnum;
  taskUpdateDate: string;
  status: LeadStatus;
  contact: string;
  user: { email: string; name: string };
}
