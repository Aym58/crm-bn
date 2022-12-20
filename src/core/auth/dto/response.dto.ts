import { HttpStatus } from '@nestjs/common';

export interface ResponseDto {
  statusCode: HttpStatus;
  message: string;
  data?: { userId: number; token: string };
}
