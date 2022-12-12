import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from './database/typeorm/typeorm.module';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { LeadModule } from './core/lead/lead.module';
import { ScriptModule } from './core/script/script.module';

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
  ],
})
export class AppModule {}
