import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { LeadController } from './lead.controller';
import { LeadEntity } from './lead.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([LeadEntity, UserEntity]),
  ],
  controllers: [LeadController],
})
export class LeadModule {}
