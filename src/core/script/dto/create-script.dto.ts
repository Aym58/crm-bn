import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

import { SourceValues, SourceValuesType } from '../constant/source-values';
import { Errors } from '../enum/errors.enum';

export class CreateScriptDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(SourceValues, {
    message: Errors.INVALID_SOURCE_NAME,
  })
  source: SourceValuesType;

  @IsNotEmpty()
  @IsString()
  link: string;
}
