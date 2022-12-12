import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { LeadController } from './lead.controller';
import { LeadEntity } from './lead.entity';
import { LeadService } from './lead.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([LeadEntity, UserEntity]),
  ],
  providers: [LeadService],
  controllers: [LeadController],
})
export class LeadModule {}
