import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { TasksEnum } from './enum/tasks.enum';
import { LeadStatus } from './enum/lead-status.enum';

@Entity({ name: 'lead' })
export class LeadEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  source: string;

  @Column({ type: 'varchar' })
  budget: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'varchar' })
  task: TasksEnum;

  @Column({ type: 'varchar', default: LeadStatus.IN_PROGRESS })
  status: LeadStatus;

  @Column({ type: 'bigint' })
  taskUpdateTime: number;

  @CreateDateColumn()
  createDate: string;

  @ManyToOne(() => UserEntity, (user) => user.leads)
  @JoinColumn()
  user: UserEntity;
}
