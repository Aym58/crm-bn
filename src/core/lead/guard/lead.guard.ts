import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { Errors } from '../enum/errors.enum';
import { LeadRepository } from '../lead.repository';

@Injectable()
export class LeadGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const leadId = Number(params.leadId);

    if (!leadId) {
      throw new BadRequestException('Lead Guard Error');
    }

    const lead = await LeadRepository.findOne({
      where: { id: leadId },
      relations: ['user'],
    });

    if (!lead) {
      throw new BadRequestException(Errors.NOT_FOUND);
    }
    request.lead = lead;
    return true;
  }
}
