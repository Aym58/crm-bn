import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

import { SourceValuesType } from './constant/source-values';

@Entity({ name: 'script' })
export class ScriptEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  source: SourceValuesType;

  @Column({ type: 'varchar' })
  link: string;

  @ManyToOne(() => UserEntity, (user) => user.scripts)
  @JoinColumn()
  user: UserEntity;
}
