import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './core/auth/auth.module';

import { UserModule } from './core/user/user.module';
import { TypeOrmModule } from './database/typeorm/typeorm.module';
import { LeadService } from './core/lead/lead.service';
import { LeadModule } from './core/lead/lead.module';

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
  ],
  providers: [LeadService],
})
export class AppModule {}
