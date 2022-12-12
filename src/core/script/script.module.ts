import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/user.entity';
import { ScriptEntity } from './script.entity';
import { UserModule } from '../user/user.module';
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([ScriptEntity, UserEntity]),
  ],
  providers: [ScriptService],
  controllers: [ScriptController],
})
export class ScriptModule {}
