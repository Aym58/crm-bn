import { Tasks } from '../enum/tasks.enum';

export interface LeadDto {
  id: number;
  name: string;
  source: string;
  budget: string;
  task: Tasks;
  contact: string;
  user: string;
}
