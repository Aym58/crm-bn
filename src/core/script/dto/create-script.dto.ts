import { IsString, IsNotEmpty } from 'class-validator';

export class CreateScriptDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}
