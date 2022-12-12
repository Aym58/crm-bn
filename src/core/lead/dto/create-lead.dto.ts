import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Errors } from '../enum/errors.enum';
import { Tasks } from '../enum/tasks.enum';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  budget: string;

  @IsNotEmpty()
  @IsEnum(Tasks, {
    message: Errors.INVALID_TASK_NAME,
  })
  task: Tasks;

  @IsNotEmpty()
  @IsString()
  contact: string;
}
