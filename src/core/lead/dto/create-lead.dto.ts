import { IsString, IsNotEmpty } from 'class-validator';

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
  @IsString()
  nextTask: string;

  @IsNotEmpty()
  @IsString()
  contact: string;
}
