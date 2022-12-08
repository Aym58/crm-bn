import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'auth' })
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => UserEntity, (user) => user.auth)
  @JoinColumn()
  user: UserEntity;
}
