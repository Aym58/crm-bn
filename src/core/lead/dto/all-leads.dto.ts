import { Tasks } from '../enum/tasks.enum';

interface LeadDto {
  id: number;
  name: string;
  source: string;
  budget: string;
  task: Tasks;
  contact: string;
  user: { email: string };
}

export interface AllLeadsDto {
  leads: LeadDto[];
}
