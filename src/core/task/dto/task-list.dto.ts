import { TasksEnum } from 'src/core/lead/enum/tasks.enum';

export interface TaskList {
  id: number;
  leadName: string;
  task: TasksEnum;
  hold: number;
  user: string;
}

export interface TaskFailureRate {
  task: TasksEnum;
  failureRate: number;
}
