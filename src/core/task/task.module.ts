import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { LeadModule } from '../lead/lead.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from '../lead/lead.entity';
import { LeadService } from '../lead/lead.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [LeadModule, AuthModule, TypeOrmModule.forFeature([LeadEntity])],
  providers: [TaskService, LeadService],
  controllers: [TaskController],
})
export class TaskModule {}
