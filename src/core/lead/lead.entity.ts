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
import { Tasks } from './enum/tasks.enum';
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
  task: Tasks;

  @Column({ type: 'varchar', default: LeadStatus.IN_PROGRESS })
  taskStatus: LeadStatus;

  @Column({ type: 'varchar' })
  contact: string;

  @CreateDateColumn()
  createDate: string;

  @ManyToOne(() => UserEntity, (user) => user.leads)
  @JoinColumn()
  user: UserEntity;
}
