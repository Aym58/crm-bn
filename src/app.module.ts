import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from './database/typeorm/typeorm.module';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { LeadModule } from './core/lead/lead.module';
import { ScriptModule } from './core/script/script.module';
import { TaskModule } from './core/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    AuthModule,
    UserModule,
    TypeOrmModule,
    LeadModule,
    ScriptModule,
    TaskModule,
  ],
})
export class AppModule {}
