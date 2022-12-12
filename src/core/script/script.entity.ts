import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'script' })
export class ScriptEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  source: string;

  @Column({ type: 'varchar' })
  link: string;

  @ManyToOne(() => UserEntity, (user) => user.scripts)
  @JoinColumn()
  user: UserEntity;
}
