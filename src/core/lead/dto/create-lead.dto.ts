import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Errors } from '../enum/errors.enum';
import { TasksEnum } from '../enum/tasks.enum';

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
  @IsEnum(TasksEnum, {
    message: Errors.INVALID_TASK_NAME,
  })
  task: TasksEnum;

  @IsNotEmpty()
  @IsString()
  contact: string;
}
