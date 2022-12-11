import * as bcrypt from 'bcrypt';

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { LeadEntity } from '../lead/lead.entity';

import { SALT } from './enum/password-salt.enum';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  registeredAt: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => LeadEntity, (lead) => lead.user)
  leads: LeadEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, SALT.VALUE);
  }
}
