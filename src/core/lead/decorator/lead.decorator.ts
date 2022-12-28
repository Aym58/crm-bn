import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LeadEntity } from '../lead.entity';
LeadEntity;

export const GetLead = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const lead: LeadEntity = context.switchToHttp().getRequest().lead;

    return data ? lead && lead[data] : lead;
  },
);
