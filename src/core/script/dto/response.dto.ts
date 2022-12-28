import { HttpStatus } from '@nestjs/common';

import { UserScriptsDto } from './user-scripts.dto';

export interface ResponseDto {
  statusCode: HttpStatus;
  message: string;
  data?: UserScriptsDto[];
}
