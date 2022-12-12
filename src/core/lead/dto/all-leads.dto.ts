interface LeadDto {
  id: number;
  name: string;
  source: string;
  budget: string;
  task: string;
  contact: string;
  user: { email: string };
}

export interface AllLeadsDto {
  leads: LeadDto[];
}
